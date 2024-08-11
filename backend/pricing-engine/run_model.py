import numpy as np
import pandas as pd
import datetime as dt
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
from scipy import interpolate, stats
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.ar_model import AutoReg

class Engine:
    def __init__(self, max_temp_file, min_temp_file):
        self.max_temp = pd.read_csv(max_temp_file)
        self.min_temp = pd.read_csv(min_temp_file)
        self.temps = None
        self.temps_season = None
        self.first_ord = None

    def create_datetime(self, row):
        try:
            return dt.datetime(int(row['Year']), int(row['Month']), int(row['Day']))
        except Exception as e:
            print("Error creating datetime:", e)
            return None

    def preprocess_data(self):
        self.max_temp['Date'] = self.max_temp.apply(self.create_datetime, axis=1)
        self.min_temp['Date'] = self.min_temp.apply(self.create_datetime, axis=1)
        self.max_temp.set_index('Date', inplace=True)
        self.min_temp.set_index('Date', inplace=True)

        drop_cols_max = ['Product code', 'Station number', 'Year', 'Month', 'Day', 
                         'Days of accumulation of maximum temperature', 'Quality']
        drop_cols_min = ['Product code', 'Station number', 'Year', 'Month', 'Day', 
                         'Days of accumulation of minimum temperature', 'Quality']

        self.max_temp.drop(columns=drop_cols_max, inplace=True)
        self.min_temp.drop(columns=drop_cols_min, inplace=True)

        self.max_temp.rename(columns={'Maximum temperature (Degree F)': 'Tmax'}, inplace=True)
        self.min_temp.rename(columns={'Minimum temperature (Degree F)': 'Tmin'}, inplace=True)

        self.temps = self.max_temp.merge(self.min_temp, left_index=True, right_index=True)
        self.temps['T'] = (self.temps['Tmax'] + self.temps['Tmin']) / 2
        self.temps.dropna(inplace=True)
        self.first_ord = self.temps.index.map(dt.datetime.toordinal)[0]

    def divide_seasons(self):
        self.temps_season = self.temps.copy(deep=True)
        self.temps_season['month'] = self.temps_season.index.month
        mask = (self.temps_season['month'] >= 5) & (self.temps_season['month'] <= 10)
        self.temps_season['winter'] = np.where(mask, 1, 0)
        self.temps_season['summer'] = np.where(self.temps_season['winter'] != 1, 1, 0)

    def plot_time_series(self, last_n=None):
        data = self.temps if last_n is None else self.temps[-last_n:]
        data.plot(figsize=(8, 6))
        plt.title('Time Series of Temperatures' if last_n is None else f'Time Series of Last {last_n} Temperature Readings')
        plt.show()

    def plot_distributions(self):
        plt.figure(figsize=(8, 6))
        self.temps.Tmax.hist(bins=60, alpha=0.6, label='Tmax')
        self.temps.Tmin.hist(bins=60, alpha=0.6, label='Tmin')
        self.temps['T'].hist(bins=60, alpha=0.8, label='T')
        plt.legend()
        plt.title('Temperature Distributions')
        plt.show()

        plt.figure(figsize=(8, 6))
        self.temps_season[self.temps_season['summer'] == 1]['T'].hist(bins=60, alpha=0.8, label='Summer')
        self.temps_season[self.temps_season['winter'] == 1]['T'].hist(bins=60, alpha=0.8, label='Winter')
        plt.legend()
        plt.title('Seasonal Temperature Distributions')
        plt.show()

    def calculate_rolling_statistics(self, years=1):
        rolling_mean = self.temps['T'].rolling(window=365*years, min_periods=1).mean()
        rolling_variance = self.temps['T'].rolling(window=365*years, min_periods=1).var()

        fig, ax1 = plt.subplots(figsize=(12, 8))

        ax1.plot(self.temps.index, rolling_mean, color="tab:red", label='Mean')
        ax1.set_xlabel("Date")
        ax1.set_ylabel("Temperature", color="tab:red")
        ax1.tick_params(axis='y', labelcolor="tab:red")
        ax1.set_title("Rolling mean and variance over annual periods")

        ax2 = ax1.twinx()
        ax2.plot(self.temps.index, rolling_variance, color="tab:blue", label='Variance')
        ax2.set_ylabel("Variance", color="tab:blue")
        ax2.tick_params(axis='y', labelcolor="tab:blue")

        ax1.legend(loc='upper left')
        ax2.legend(loc='upper right')

        plt.show()

    def validate_temperature_range(self):
        print("Max Temperature Range: ", self.temps['Tmax'].min(), self.temps['Tmax'].max())
        print("Min Temperature Range: ", self.temps['Tmin'].min(), self.temps['Tmin'].max())
        print("Average Temperature Range: ", self.temps['T'].min(), self.temps['T'].max())

    def seasonal_decomposition(self, years=20):
        decompose_result = seasonal_decompose(self.temps['T'], model='additive', period=int(365), extrapolate_trend='freq')
        decompose_result.plot()
        plt.show()

        trend = decompose_result.trend
        seasonal = decompose_result.seasonal
        residual = decompose_result.residual

        years_examine = 365*years
        fig, axs = plt.subplots(3, figsize=(8, 6))
        fig.suptitle('Removed Seasonality and Trend')
        axs[0].plot(trend[-years_examine:])
        axs[1].plot(seasonal[-years_examine:])
        axs[1].set_ylim([-10, 10])
        axs[2].plot(residual[-years_examine:])
        axs[2].set_ylim([-10, 10])

    def fit_models(self):
        def model_fit(x, a, b, a1, b1):
            omega = 2 * np.pi / 365.25
            return a + b * x + a1 * np.cos(omega * x) + b1 * np.sin(omega * x)

        def model_fit_general(x, a, b, a1, b1, theta, phi):
            omega = 2 * np.pi / 365.25
            return a + b * x + a1 * np.cos(omega * x + theta) + b1 * np.sin(omega * x) + phi

        temp_t = self.temps['T'].copy(deep=True).to_frame()
        temp_t.index = temp_t.index.map(dt.datetime.toordinal)

        params, cov = curve_fit(model_fit, xdata=temp_t.index-self.first_ord, ydata=temp_t['T'])
        print('\nModel 1 Parameters\n')
        param_list = ['a', 'b', 'a1', 'b1']
        std_dev = np.sqrt(np.diag(cov))
        for name, p, sd in zip(param_list, params, std_dev):
            print(f'{name} : {p:0.3f} CI ~normally [{p-1.96*sd:0.2e},{p+1.96*sd:0.2e}]')

        temp_t['Model 1 (Sine)'] = model_fit(temp_t.index-self.first_ord, *params)
        params1, cov1 = curve_fit(model_fit_general, xdata=temp_t.index-self.first_ord, ydata=temp_t['T'])
        print('\nModel 2 Parameters\n')
        param_list = ['a', 'b', 'a1', 'b1', 'theta', 'phi']
        std_dev = np.sqrt(np.diag(cov1))
        for name, p, sd in zip(param_list, params1, std_dev):
            print(f'{name} : {p:0.3f} CI ~normally [{p-1.96*sd:0.2e},{p+1.96*sd:0.2e}]')

        temp_t['Model 2 (Gen)'] = model_fit_general(temp_t.index-self.first_ord, *params1)
        temp_t.index = temp_t.index.map(dt.datetime.fromordinal)

        temp_t[-2000:].plot(figsize=(12, 4), style=['s', '^-', 'k--'], markersize=4, linewidth=2)
        plt.show()

        print('\nResidual Sum of Squares (RSS)\n')
        rss1 = np.sqrt((temp_t['T'] - temp_t['Model 1 (Sine)']) ** 2).sum()
        rss2 = np.sqrt((temp_t['T'] - temp_t['Model 2 (Gen)']) ** 2).sum()
        print(f'RSS Model 1 (Sine): {round(rss1, 2)}')
        print(f'RSS Model 2 (Gen): {round(rss2, 2)}')

        self.temps = temp_t

    def autocorrelation_analysis(self):
        self.temps['res'] = self.temps['T'] - self.temps['Model 2 (Gen)']
        self.temps['res'][-5000:].plot(figsize=(12, 6))
        plt.title("Residuals of the Last 5000 Observations")
        plt.show()

        TLags = 30
        PLags = 30
        fig, axs = plt.subplots(2, 2, figsize=(12, 8))
        fig.suptitle('Residuals after De-trending and Removing Seasonality from the DAT')
        axs[0, 0].plot(self.temps['res'])
        axs[1, 0].plot(self.temps['res'][-2000:])
        plot_acf(self.temps['res'], lags=TLags, ax=axs[0, 1])
        plot_pacf(self.temps['res'], lags=PLags, ax=axs[1, 1])
        plt.show()

    def probability_distribution(self):
        res = self.temps['res']
        stats.probplot(res, dist="norm", plot=plt)
        plt.title("Normal Probability Plot")
        plt.show()

        mu, std = norm.fit(res)
        z = (res - mu) / std
        plt.hist(res, density=True, alpha=0.6, bins=100, label='Temp Error')
        xmin, xmax = plt.xlim()
        ymin, ymax = plt.ylim()
        x = np.linspace(xmin, xmax, 100)
        p = norm.pdf(x, mu, std)
        plt.plot(x, p, 'k', linewidth=2, label='Normal Dist')
        plt.plot([std*2, std*2], [0, ymax])
        plt.ylabel('Probability Density')
        plt.xlabel('Temperature Errors')
        plt.legend()
        plt.show()

        print(f'P(Z > 2): {len(z[z >= 2])/len(z)*100:.3f}% vs. Normal Distribution: {(1-norm.cdf(2))*100:.3f}%')
        print(f'Skew     : {skew(z):.3f}')
        print(f'Kurtosis : {kurtosis(z) + 3:.3f}')

    def autoregression_residuals(self):
        residuals = self.temps['res']
        residuals.index = pd.DatetimeIndex(residuals.index).to_period('D')
        model = AutoReg(residuals, lags=1, old_names=True, trend='n')
        model_fit = model.fit()
        print(model_fit.summary())

    def calculate_monthly_volatility(self):
        self.temps['Day'] = self.temps.index.dayofyear
        self.temps['month'] = self.temps.index.month
        self.temps['year'] = self.temps.index.year
        vol = self.temps.groupby(['year', 'month'])['T'].agg(['mean', 'std'])
        vol = vol.reset_index()
        vol['std'].plot(figsize=(8, 6))
        plt.plot([0, len(vol)], [vol['std'].mean(), vol['std'].mean()], 'k', linewidth=2)
        plt.ylabel('Std Dev (deg F)')
        plt.title('Monthly Volatility of Observed Daily Average Temperatures', color='k')
        print('Trend or long term volatility is easy: ~', round(vol['std'].mean(), 3))
        plt.show()

    def calculate_daily_volatility(self):
        vol = self.temps.groupby(['Day'])['T'].agg(['mean', 'std'])
        vol['std'].plot(color='tab:blue', figsize=(8, 6))
        plt.ylabel('Std Dev (deg F)', color='tab:blue')
        plt.xlim(0, 364)
        plt.show()

    def spline_fit_volatility(self):
        vol = self.temps.groupby(['Day'])['T'].agg(['mean', 'std'])
        x = np.array(vol['std'].index)
        y = np.array(vol['std'].values)
        knot_numbers = 5
        x_new = np.linspace(0, 1, knot_numbers + 2)[1:-1]
        t, c, k = interpolate.splrep(x, y, t=np.quantile(x, x_new), s=1)
        yfit = interpolate.BSpline(t, c, k)(x)
        plt.figure(figsize=(8, 4))
        plt.plot(x, y, label='Volatility')
        plt.plot(x, yfit, label='Spline Fit')
        plt.ylabel('Std Dev (deg F)')
        plt.xlabel('Day in Year')
        plt.xlim(0, 364)
        plt.legend(loc='lower right')
        plt.show()

        knots = [3, 10, 20, 30, 50, 80]
        fig, ax = plt.subplots(nrows=2, ncols=3, figsize=(8, 5))
        for i, ax_ in enumerate(ax.flat):
            ax_.plot(x, y, '-', c='tab:orange', markersize=4)
            yfit = self.spline(knots[i], x, y)
            rss = np.sum(np.square(y - yfit))
            ax_.plot(x, yfit, 'k', linewidth=2)
            ax_.set_title(f"Knots # {knots[i]}\nRSS: {round(rss, 2)}", color='k')
            ax_.set_xlim(0, 366)
            ax_.grid()
        plt.tight_layout()
        plt.show()

    def estimate_volatility(self):
        vol = self.temps.groupby(['Day'])['T'].agg(['mean', 'std'])
        days = np.array(vol['std'].index)
        T_std = np.array(vol['std'].values)

        volatility = self.spline(5, days, T_std)
        plt.figure(figsize=(8, 4))
        plt.plot(days, T_std, marker='.', label='Volatility')
        plt.plot(days, volatility, linewidth=4, label='Spline Fit')
        plt.ylabel('Std Dev (deg F)')
        plt.xlabel('Day in Year')
        plt.xlim(0, 364)
        plt.legend(loc='lower right')
        plt.show()

    def spline(self, knots, x, y):
        x_new = np.linspace(0, 1, knots + 2)[1:-1]
        t, c, k = interpolate.splrep(x, y, t=np.quantile(x, x_new), s=3)
        yfit = interpolate.BSpline(t, c, k)(x)
        return yfit

    def estimate_volatility_of_volatility(self):
        vol = self.temps.groupby(['Day'])['T'].agg(['mean', 'std'])
        print('Gamma is: ', round(vol['std'].std(), 3))
        model = AutoReg(vol['std'], lags=1, old_names=True, trend='n')
        model_fit = model.fit()
        coef = model_fit.params
        print('Rate of mean reversion of volatility process is: ', coef[0])
        print(model_fit.summary())

    def euler_step(self, row, kappa, M):
        if row['Tbar_shift'] is np.nan:
            T_i = row['Tbar']
        else:
            T_i = row['Tbar_shift']
        T_det = T_i + row['dTbar']
        T_mrev = kappa * (row['Tbar'] - T_i)
        sigma = row['vol'] * np.random.randn(M)
        return T_det + T_mrev + sigma

    def monte_carlo_temp(self, trading_dates, Tbar_params, vol_model, M=1, kappa=0.88):
        if isinstance(trading_dates, pd.DatetimeIndex):
            trading_dates = trading_dates.map(dt.datetime.toordinal)

        Tbars = self.T_model(trading_dates - self.first_ord, *Tbar_params)
        dTbars = self.dT_model(trading_dates - self.first_ord, *Tbar_params)

        mc_temps = pd.DataFrame(data=np.array([Tbars, dTbars]).T, index=pd.to_datetime(trading_dates, origin='julian', unit='D'), columns=['Tbar', 'dTbar'])
        mc_temps['Day'] = mc_temps.index.dayofyear
        mc_temps['vol'] = vol_model[mc_temps['Day'] - 1]
        mc_temps['Tbar_shift'] = mc_temps['Tbar'].shift(1)

        data = mc_temps.apply(self.euler_step, args=(kappa, M), axis=1)

        mc_sims = pd.DataFrame(data={x: data.values for x in range(1, M + 1)},
                               index=pd.to_datetime(trading_dates, origin='julian', unit='D'), columns=range(1, M + 1))
        return mc_temps, mc_sims

    def T_model(self, x, a, b, alpha, theta):
        omega = 2 * np.pi / 365.25
        T = a + b * x + alpha * np.sin(omega * x + theta)
        return T

    def dT_model(self, x, a, b, alpha, theta):
        omega = 2 * np.pi / 365.25
        dT = b + alpha * omega * np.cos(omega * x + theta)
        return dT

    def pricing_simulation(self):
        Tbar_params = [62.1, 6.00e-05, 9.03, 1.26]
        self.temps['model_fit'] = self.T_model(self.temps.index.map(dt.datetime.toordinal) - self.first_ord, *Tbar_params)

        no_sims = 5
        trading_dates = pd.date_range(start='2024-04-22', end='2025-04-22', freq='D')
        mc_temps, mc_sims = self.monte_carlo_temp(trading_dates, Tbar_params, self.spline_fit_volatility(), no_sims)

        plt.figure(figsize=(12, 6))
        mc_sims[1].plot(alpha=0.6, linewidth=2, marker='.')
        mc_temps["Tbar"].plot(linewidth=4)
        plt.legend(loc='lower right')
        plt.show()

        no_sims = 10000
        trading_dates_winter = pd.date_range(start='2023-07-01', end='2023-07-01', freq='D')
        mc_temps_winter, mc_sims_winter = self.monte_carlo_temp(trading_dates_winter, Tbar_params, self.spline_fit_volatility(), no_sims)
        trading_dates_summer = pd.date_range(start='2023-01-01', end='2023-01-01', freq='D')
        mc_temps_summer, mc_sims_summer = self.monte_carlo_temp(trading_dates_summer, Tbar_params, self.spline_fit_volatility(), no_sims)
        
        plt.figure(figsize=(12, 6))
        plt.title('Winter vs Summer Temperature MC Sims')
        Tbar_summer = mc_temps_summer.iloc[-1, :]['Tbar']
        Tbar_winter = mc_temps_winter.iloc[-1, :]['Tbar']
        plt.hist(mc_sims_summer.iloc[-1, :], bins=20, alpha=0.5, label='Summer', color='tab:orange')
        plt.plot([Tbar_summer, Tbar_summer], [0, 1600], linewidth=4, label='Tbar_summer', color='tab:orange')
        plt.hist(mc_sims_winter.iloc[-1, :], bins=20, alpha=0.5, label='Winter', color='tab:blue')
        plt.plot([Tbar_winter, Tbar_winter], [0, 1600], linewidth=4, label='Tbar_winter', color='tab:blue')
        plt.legend()
        plt.show()

    def calculate_option_probability(self, trading_dates, Tbar_params, vol_model, first_ord):
        volatility = self.spline(5, np.arange(1, 366), vol_model)
        mc_temps, mc_sims = self.monte_carlo_temp(trading_dates, Tbar_params, volatility, first_ord)
        probability = len(mc_sims[mc_sims[1] >= 65]) / len(mc_sims) * 100
        print(f'Probability P(max(65-Tn, 0) = 0): {probability:1.1f}%')
        return probability

    def risk_neutral(self, trading_dates, Tbar_params, vol_model, first_ord, lamda, kappa=0.438):
        if isinstance(trading_dates, pd.DatetimeIndex):
            trading_date = trading_dates.map(dt.datetime.toordinal)

        Tbars = self.T_model(trading_date - first_ord, *Tbar_params)
        dTbars = self.dT_model(trading_date - first_ord, *Tbar_params)
        mc_temps = pd.DataFrame(data=np.array([Tbars, dTbars]).T, index=trading_dates, columns=['Tbar', 'dTbar'])

        mc_temps['day'] = mc_temps.index.dayofyear
        mc_temps['vol'] = vol_model[mc_temps['day'] - 1]
        time_arr = np.array([i / 365.25 for i in range(1, len(trading_dates) + 1)])
        vol_arr = mc_temps['vol'].values
        mu_rn = self.rn_mean(time_arr, vol_arr, Tbars, lamda, kappa)
        var_rn = self.rn_var(time_arr, vol_arr, kappa)
        return mu_rn, var_rn

    def rn_mean(self, time_arr, vol_arr, Tbars, lamda, kappa):
        dt = 1 / 365.25
        N = len(time_arr)
        mean_intervals = -vol_arr * (1 - np.exp(-kappa * dt)) / kappa
        return 65 * N - (np.sum(Tbars) - lamda * np.sum(mean_intervals))

    def rn_var(self, time_arr, vol_arr, kappa):
        dt = 1 / 365.25
        var_arr = np.power(vol_arr, 2)
        var_intervals = var_arr / (2 * kappa) * (1 - np.exp(-2 * kappa * dt))
        cov_sum = 0
        for i, ti in enumerate(time_arr):
            for j, tj in enumerate(time_arr):
                if j > i:
                    cov_sum += np.exp(-kappa * (tj - ti)) * var_intervals[i]
        return np.sum(var_intervals) + 2 * cov_sum

    def winter_option(self, trading_dates, r, alpha, K, tau, opt='c', lamda=0.0):
        mu_rn, var_rn = self.risk_neutral(trading_dates, Tbar_params, self.spline_fit_volatility(), self.first_ord, lamda)
        disc = np.exp(-r * tau)
        vol_rn = np.sqrt(var_rn)
        zt = (K - mu_rn) / vol_rn
        exp = np.exp(-zt ** 2 / 2)
        if opt == 'c':
            return alpha * disc * ((mu_rn - K) * stats.norm.cdf(-zt) + vol_rn * exp / np.sqrt(2 * np.pi))
        else:
            exp2 = np.exp(-mu_rn ** 2 / (2 * vol_rn ** 2))
            return alpha * disc * ((K - mu_rn) * (stats.norm.cdf(zt) - stats.norm.cdf(-mu_rn / vol_rn)) +
                                   vol_rn / np.sqrt(2 * np.pi) * (exp - exp2))

    def temperature_option(self, trading_dates, no_sims, Tbar_params, vol_model, r, alpha, K, tau, first_ord, opt='c'):
        mc_temps, mc_sims = self.monte_carlo_temp(trading_dates, Tbar_params, vol_model, first_ord, no_sims)
        N, M = np.shape(mc_sims)
        mc_arr = mc_sims.values
        DD = np.sum(np.maximum(65 - mc_arr, 0), axis=0)
        if opt == 'c':
            CT = alpha * np.maximum(DD - K, 0)
        else:
            CT = alpha * np.maximum(K - DD, 0)
        C0 = np.exp(-r * tau) * np.sum(CT / M)
        sigma = np.sqrt(np.sum((np.exp(-r * tau) * CT - C0) ** 2) / (M - 1))
        SE = sigma / np.sqrt(M)
        return C0, SE

    def compare_option_pricing(self):
        strikes = np.arange(400, 1600, 50)
        data = np.zeros(shape=(len(strikes), 4))
        trading_dates = pd.date_range(start='2024-05-01', end='2024-11-01', freq='D')
        vol_model = self.spline_fit_volatility()
        no_sims = 10000
        r = 0.05
        K = 300
        alpha = 2500
        tau = self.years_between('2024-05-01', '2024-11-01')

        for i, strike in enumerate(strikes):
            data[i, 0] = self.temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, strike, tau, self.first_ord, 'c')[0]
            data[i, 1] = self.winter_option(trading_dates, r, alpha, strike, tau, 'c')
            data[i, 2] = self.temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, strike, tau, self.first_ord, 'p')[0]
            data[i, 3] = self.winter_option(trading_dates, r, alpha, strike, tau, 'p')

        df = pd.DataFrame({'MC Call': data[:, 0], 'BSA Call': data[:, 1], 'MC Put': data[:, 2], 'BSA Put': data[:, 3]})
        df.index = strikes
        plt.plot(df)
        plt.title('Winter Temperature Options')
        plt.ylabel('Option Price USD')
        plt.xlabel('Strikes (HDD)')
        plt.legend(df.columns, loc=4)
        plt.show()

    def years_between(self, d1, d2):
        d1 = dt.datetime.strptime(d1, "%Y-%m-%d")
        d2 = dt.datetime.strptime(d2, "%Y-%m-%d")
        return abs((d2 - d1).days) / 365.25


# Usage
analysis = Engine('./data/maximum_temperature.csv', './data/minimum_temperature.csv')
analysis.preprocess_data()
analysis.divide_seasons()
analysis.plot_time_series()
analysis.plot_time_series(last_n=5000)
analysis.plot_distributions()
analysis.calculate_rolling_statistics(years=1)
analysis.validate_temperature_range()
analysis.seasonal_decomposition(years=20)
analysis.fit_models()
analysis.autocorrelation_analysis()
analysis.probability_distribution()
analysis.autoregression_residuals()
analysis.calculate_monthly_volatility()
analysis.calculate_daily_volatility()
analysis.spline_fit_volatility()
analysis.estimate_volatility()
analysis.estimate_volatility_of_volatility()
analysis.pricing_simulation()
analysis.compare_option_pricing()
