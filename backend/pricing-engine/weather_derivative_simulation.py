import numpy as np
import pandas as pd
import datetime as dt
import scipy.stats as stats
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')
from scipy import interpolate
from statsmodels.graphics.api import qqplot
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.ar_model import AutoReg, ar_select_order, AutoRegResults
from scipy.stats import norm
from scipy.optimize import curve_fit

class Engine:
    def __init__(self, max_temp, min_temp, temps, temps_season, first_ord):
        self.max_temp
        self.min_temp
        self.temps = None
        self.temps_season = None
        self.first_ord = None

    def create_datetime(self, row):
        try:
            return dt.datetime(int(row['Year']), int(row['Month']), int(row['Day']))
        except Exception as e:
            print("Error creating datetime", e)
            return None
        
    def preprocess_data(self):
        self.max_temp = pd.read_csv('./data/maximum_temperature.csv')
        self.min_temp = pd.read_csv('./data/minimum_temperature.csv')

        print("Max Temp Data:\n", self.max_temp.head())
        print("Min Temp Data:\n", self.min_temp.head())
    
        self.max_temp['Date'] = self.max_temp.apply(self.create_datetime, axis=1)
        self.min_temp['Date'] = self.min_temp.apply(self.create_datetime, axis=1)

        self.max_temp.set_index('Date', inplace=True)
        self.min_temp.set_index('Date', inplace=True)

        self.drop_cols_max = ['Product code', 'Station number', 'Year', 'Month', 'Day', 
                    'Days of accumulation of maximum temperature', 'Quality']
        self.drop_cols_min = ['Product code', 'Station number', 'Year', 'Month', 'Day', 
                    'Days of accumulation of minimum temperature', 'Quality']

        self.max_temp.drop(columns=self.drop_cols_max, inplace=True)
        self.min_temp.drop(columns=self.drop_cols_min, inplace=True)
        self.max_temp.rename(columns={'Maximum temperature (Degree F)':'Tmax'}, inplace=True)
        self.min_temp.rename(columns={'Minimum temperature (Degree F)':'Tmin'}, inplace=True)

        self.temps = self.max_temp.merge(self.min_temp, left_index=True, right_index=True)

        self.temps['T'] = (self.temps['Tmax'] + self.temps['Tmin']) / 2
        self.temps.dropna(inplace=True)

        print("Final Temps DataFrame:\n", self.temps.head())

        # Winter and Summer seasons Split
        self.temps_season = self.temps.copy(deep=True)
        self.temps_season['month'] = self.temps_season.index.month
        mask = (self.temps_season['month'] >= 5) & (self.temps_season['month'] <= 10)
        self.temps_season['winter'] = np.where(mask, 1, 0)
        self.temps_season['summer'] = np.where(self.temps_season['winter'] != 1, 1, 0)

        # Plot entire dataset
        self.temps.plot(figsize=(8, 6))
        plt.title('Time Series of Temperatures')
        plt.show()

        # Plot last 5000 data points
        self.temps[-5000:].plot(figsize=(8, 6))
        plt.title('Time Series of Last 5000 Temperature Readings')
        plt.show()

        # Temperature Distributions
        plt.figure(figsize=(8, 6))
        self.temps.Tmax.hist(bins=60, alpha=0.6, label='Tmax')
        self.temps.Tmin.hist(bins=60, alpha=0.6, label='Tmin')
        self.temps['T'].hist(bins=60, alpha=0.8, label='T')
        plt.legend()
        plt.title('Temperature Distributions')
        plt.show()

        # Summer and Winter Temperature Distributions
        plt.figure(figsize=(8, 6))
        self.temps_season[self.temps_season['summer'] == 1]['T'].hist(bins=60, alpha=0.8, label='Summer')
        self.temps_season[self.temps_season['winter'] == 1]['T'].hist(bins=60, alpha=0.8, label='Winter')
        plt.legend()
        plt.title('Seasonal Temperature Distributions')
        plt.show()

        # Rolling Calculations for Mean and Variance
        self.temps.sort_index(inplace=True)
        # sort Df by date
        self.temps.sort_index(inplace=True)

        # Adjust the rolling window size
        self.Years = 1  # Try with a 5-year window instead of 20 years

        # Calculate rolling mean and variance
        self.rolling_mean = self.temps['T'].rolling(window=365*Years, min_periods=1).mean()
        self.rolling_variance = self.temps['T'].rolling(window=365*Years, min_periods=1).var()

        # Debug: Check rolling mean and variance with new window size
        print("Rolling Mean (first 5 values):\n", self.rolling_mean.head())
        print("Rolling Variance (first 5 values):\n", self.rolling_variance.head())

        # Create a plot for rolling mean and variance with separate axes
        self.fig, self.ax1 = plt.subplots(figsize=(12, 8))

        # Plot rolling mean
        self.ax1.plot(temps.index, self.rolling_mean, color="tab:red", label='Mean')
        self.ax1.set_xlabel("Date")
        self.ax1.set_ylabel("Temperature", color="tab:red")
        self.ax1.tick_params(axis='y', labelcolor="tab:red")
        self.ax1.set_title("Rolling mean and variance over annual periods")

        # Create a second y-axis for variance
        self.ax2 = self.ax1.twinx()
        self.ax2.plot(self.temps.index, self.rolling_variance, color="tab:blue", label='Variance')
        self.ax2.set_ylabel("Variance", color="tab:blue")
        self.ax2.tick_params(axis='y', labelcolor="tab:blue")

        # Add legends
        self.ax1.legend(loc='upper left')
        self.ax2.legend(loc='upper right')

        plt.show()

        # Validate Temperature Range
        print("Max Temperature Range: ", self.temps['Tmax'].min(), self.temps['Tmax'].max())
        print("Min Temperature Range: ", self.temps['Tmin'].min(), self.temps['Tmin'].max())
        print("Average Temperature Range: ", self.temps['T'].min(), self.temps['T'].max())

        # 5.1.4 (page 14) Seasonal Decomposition
        # come up with new label for decompose_result
        self.decompose_result = seasonal_decompose(self.temps['T'], model='additive', period=int(365), extrapolate_trend='freq')
        trend = self.decompose_result.trend
        seasonal = self.decompose_result.seasonal
        residual = self.decompose_result.residual

        self.decompose_result.plot()
        plt.show()

        self.Years=20
        self.years_examine = 365*self.Years
        self.fig, self.axs = plt.subplots(3, figsize=(8,6))
        self.fig.suptitle('Removed Seasonality and Trend')
        self.axs[0].plot(trend[-years_examine:])
        self.axs[1].plot(seasonal[-years_examine:])
        self.axs[1].set_ylim([-10,10])
        self.axs[2].plot(residual[-years_examine:])
        self.axs[2].set_ylim([-10,10])

# 5.1.5 Fit models to daily average temperature time series, model parameters analysis
#
        # Model 1 
        # Model 2
        temp_t = temps['T'].copy(deep=True)
        temp_t = temp_t.to_frame()

# Defined Models
# Model 1 (Sine)
def model_fit(x, a, b, a1, b1):
    self.omega = 2*np.pi/365.25
    y_pred = a + b*x + a1*np.cos(self.omega*x) + b1*np.sin(self.omega*x)
    return y_pred
def RSS(y, y_pred):
    return np.sqrt( (y - y_pred)**2 ).sum()

# Model 2 (Generalized)
def model_fit_general(x, a, b, a1, b1, theta, phi):
    omega = 2*np.pi/365.25
    y_pred = a + b*x + a1*np.cos(omega*x + theta) + b1*np.sin(omega*x) + phi
    return y_pred

if isinstance(temp_t.index, pd.DatetimeIndex):
    first_ord = temp_t.index.map(dt.datetime.toordinal)[0]
    temp_t.index=temp_t.index.map(dt.datetime.toordinal)

params, cov = curve_fit(model_fit, xdata = temp_t.index-first_ord, ydata = temp_t['T'], mthod='1m')
param_list = ['a', 'b', 'a1', 'b1']
print('\n Model 1 Parameters \n')
std_dev = np.sqrt(np.diag(cov))
for name, p, sd in zip(param_list, params, std_dev):
    print('{0} : {1:0.3} CI ~normally [{2:0.2e},{3:0.2e}]'.format(name, p, p-1.96*sd,p+1.96*sd))

temp_t['Model 1 (Sine)'] = model_fit(temp_t.index-first_ord, *params)
if isinstance(temp_t.index, pd.DatetimeIndex):
    temp_t.index=temp_t.map(dt.datetime.toordinal)
    params1, cov1 = curve_fit(model_fit_general, xdata = temp_t.index-first_ord, ydata = temp_t['T'], method='1m')
    param_list = ['a', 'b', 'a1', 'b1', 'theta', 'phi']
    print('\n Model 2 Parameters \n')
    std_dev = np.sqrt(np.diag(cov1))
    for name, p, sd in zip(param_list, params1, std_dev):
        print('{0} : {1:0.3} CI ~normally [{2:0.2e},{3:0.2e}]'.format(name, p, p-1.96*sd,p+1.96*sd))
    temp_t['Model 2 (Gen)'] = model_fit_general(temp_t.index-first_ord, *params1)
    if not isinstance(temp_t.index, pd.DatetimeIndex):
        temp_t.index=temp_t.index.map(dt.datetime.fromordinal)
    temp_t[:2000].plot(figsize=(12,4), style=['s','^-','k--'] , markersize=4, linewidth=2 )
    temp_t[-2000].plot(figsize=(12,4), style=['s','^-','k--'] , markersize=4, linewidth=2 )
    RSS(temp_t['T'], temp_t['Model 2 (Gen)'])

    print('\n Residual Sum of Squares (RSS) \n')
    print('     RSS Model 1 (Sine):', round(RSS(temp_t['T'], temp_t['Model 1 (Sine)']),2))
    print('     RSS Model 2 (Gen):', round(RSS(temp_t['T'], temp_t['Model 1 (Gen)']),2))

# Calculate parameters with data and fit curve
temp_t = temps['T'].copy(deep=True)
temp_t = temp_t.to_frame()
def model(x, params):
    a,b,a1,b1 = params
    omega = 2*np.pi/365.25
    theta = np.arctan(a1/b1)
    alpha = np.sqrt( a1**2 + b1**2 )
    print('Parameters:\n    a {0:0.3}\n     b {1:0.3}\n alpha {2:0.3}\n theta {3:0.3}'.format(a,b,alpha,theta))
    y_pred = a + b*x + alpha*np.sin(omega*x + theta)
    return y_pred
def model_fit(x, a, b, a1, b1):
    omega = 2*np.pi/365.25
    y_pred = a + b*x + a1*np.cos(omega*x) + b1*np.sin(omega*x)
    return y_pred
if ininstance(temp_t.index , pd.DatetimeIndex):
    first_ord = temp_t.index.map(dt.datetime.toordinal)[0]
    temp_t.index=temp_t.index.map(dt.datetime.toordinal)

params_all, cov = curve_fit(model_fit, xdata = temp_t.index-first_ord, ydata = temp_t['T'], method='1m')

temp_t['Model'] = model(temp_t.index-first_ord, params_all)
if not isinstance(temp_t.index  ,  pd.DatetimeIndex):
    temp_t.index=temp_t.index.map(dt.datetime.fromordinal)

temp_t[-2000:].plot(figsize=(12,4), style=['s','^-','k-'] , markersize=4, linewidth=3)
plt.show()

# 5.1.7 Autocorrelation

## Visualize Residuals after detrending and removing seasonality from the Daily Average Temperature (DAT) 12 years.
if not isinstance(temp_t.index , pd.DatetimeIndex):
    temp_t.index=temp_t.index.map(dt.datetime.fromordinal)
temp_t['res'] = temp_t['T']-temp_t['Model']
temp_t['res'][-5000].plot(figsize=(12,6))
plt.show()

# Visualizes autocorrelation for all the time series (TLags) and the last few years (Plags).
TLags = 30
PLags = 30
fig, axs = plt.subplots(2,2, figsize=(12,8))
fig.suptitle('Residuals after de-trending and removing seasonality from the DAT')
axs[0,0].plot(temp_t['res'])
axs[1,0].plot(temp_t['res'][-2000:])
plot_acf(temp_t['res'], lags = TLags, ax=axs[0,1])
plot_pacf(temp_t['res'], lags = PLags, ax=axs[1,1])
plt.show()

# 5.1.8 Probability Distribution Calculation
stats.probplot(temp_t['res'], dist="norm", plot=plt)
plt.title("Normal Probability Plot")
plt.show()

# Probability Distribution of Temperature Errors and compare it to the Normal Distribution
mu, std = norm.fit(temp_t['res'])
z = (temp_t['res'] - mu)/std
plt.hist(temp_t['res'], density=True, alpha=0.6, bins=100, label='Temp Error')
xmin, xmax = plt.xlim()
ymin, ymax = plt.ylim()
x = np.linspace(xmin, xmax, 100)
p = norm.pdf(x, mu, std)
data = np.random.randn(100000)
plt.plot(x, p, 'k', linewidth=2, label='Normal Dist')
plt.plot([std*2,std*2],[0,ymax])
print('P(Z > 2): {0.3}% vs. Normal Distribution: {:0.3}% '.format(len(z[z >= 2])/len(z)*100, (1-norm.cdf(2))*100))
print('Skew     : {:0.3}%'.format(stats.skew(z)))
print('Kurtosis : {:0.3}'.format(stats.kurtosis(z)+3))
plt.ylabel('Probability Density')
plt.xlabel('Temperature Errors')
plt.legend()
plt.show()

# 5.1.9 Visualization of Fitted Data

## Plots Partial Data and Fit Model
rows=2000
temp_t[['T','Model']][-rows:].plot(figsize=(12,6), style=['s','k-'] , markersize=4, linewidth=3)
plt.show()

# 5.1.10 Autoregression Temperature Residuals 
residuals = temp_t['res']
residuals.index = pd.DatetimeIndex(residuals.index).to_period('D')
model = AutoReg(residuals, lags=1, old_names=True, trends='n')
model_fit = model.fit()
coef = model_fit.params
res = model_fit.resid
res.index = res.index.to_timestamp()
print(model_fit.summary())

# 5.1.11. DAT Monthly Volatility 

## Estimate volatility based on quadratic variation of temperature process. Plot Monthly Volatility of DAT
temp_t['Day'] = temp_t.index.dayofyear
temp_t['month'] = temp_t.index.month
temp_t['year'] = temp_t.index.year
vol = temp_t.groupby(['year','month'])['T'].agg(['mean','std'])
vol = vol.reset_index()
vol['std'].plot(figsize=(8,6))
plt.plot([0, len(vol)], [vol['std'].mean(),vol['std'].mean()], 'k', linewidth=2)
plt.ylabel('Std Dev (deg F)')
plt.title('Monthly Volatility of Observed Daily Average Temperatures', color='k',)
print('Trend or long term volatility is easy: ~', round(vol['std'].mean(),3))
plt.show()

# 5.1.12 

## Estimate DAT Daily Volatility
vol = temp_t.groupby(['Day'])['T'].agg(['mean','std'])
vol['std'].plot(color='tab:blue', figsize=(8,6))
plt.ylabel('Std Dev (deg F)',color='tab:blue')
plt.xlim(0,364)
plt.show()

## 5.1.13. 5-know (optimal) B-splined applied to daily volatility

## Plot Spline Fit of volatility
from scipy import interpolate
x = np.array(vol['std'].index)
y = np.array(vol['std'].values)
knot_numbers = 5
x_new = np.linspace(0, 1, knot_numbers+2)[1:-1]
q_knots = np.quantile(x, x_new)
t,c,k = interpolate.sprep(x, y, t=q_knots, s=1)
yfit = interpolate.BSpline(t,c,k)(x)
plt.figure(figsize=(8,4))
plt.plot(x, y, label='Volatility')
plt.plot(x, yfit, label='Spline Fit')
plt.ylabel('Std Dev (deg C)')
plt.xlabel('Day in Year')
plt.xlim(0,364)
plt.legend(loc='lower right')
plt.show()
def spline(knots, x, y):
    x_new = np.linspace(0, 1, knots+2)[1:-1]
    t, c, k = interpolate.splrep(x, y, t=np.quantile(x, x_new), s=3)
    yfit = interpolate.BSpline(t,c, k)(x)
    return yfit
knots = [3, 10, 20, 30, 50, 80]
i = 0
fig, ax = plt.subplots(nrows=2, ncols=3, figsize=(8, 5))
for row in range(2):
    for col in range(3):
        ax[row][col].plot(x, y, '-',c='tab:orange', markersize=4)
        yfit = spline(knots[i], x, y)
        rss = np.sum( np.square(y-yfit) )
        ax[row][col].plot(x, yfit, 'k', linewidth=2)
        ax[row][col].set_title("Knots # "+str(knots[i])+"\nRSS: "+str(round(rss,2)), color='k')
        ax[row][col].set_xlim(0,366)
        ax[row][col].grid()
        i=i+1
plt.tight_layout()
plt.show()

## 5.1.14 Volatility function obtained from Quadratic Variation of Temperature process

# Estimate Volatility from the quadratic variation of the Temperature Process
temp_vol = temps['T'].copy(deep=True)
temp_vol = temp_vol.to_frame()
temp_vol['Day'] = temp_vol.index.dayofyear
temp_vol['month'] = temp_vol.index.month
vol = temp_vol.groupby(['Day'])['T'].agg(['mean','std'])
days = np.array(vol['std'].index)
T_std = np.array(vol['std'].values)

# Fits Std Dev to 5-knots spline
def spline(knots, x, y):
    x_new = np.linspace(0, 1, knots+2)[1:-1]
    t, c, k = interpolate.splrep(x, y, t=np.quantile(x, x_new), s=3)
    yfit = interpolate.BSpline(t, c, k)(x)
    return yfit

volatility = spline(5, days, T_std)
plt.figure(figsize=(8,4))
plt.plot(days, T_std, marker='.', label='Volatility')
plt.plot(days, volatility, linewidth=4, label='Spline Fit')
plt.ylabel('Std Dev (deg F)')
plt.xlabel('Day in Year')
plt.xlim(0, 364)
plt.legend(loc='lower right')
plt.show()

## 5.1.15 Volatility (k) of the volatility process was estimated using the quadratic variation of o
# Estimate volatility of the volatility process by using the quadratic variation of sigma.
print('Gamma is: ', round(vol['std'].std(), 3))
model = AutoReg(vol['std'], lags=1, old_names=True, trend='n')
model_fit = model.fit()
coef = model_fit.params
res = model_fit.resid
print('Rate of mean reversion of volatility process is: ', coef[0])
print(model_fit.summary())

## 5.1.15 Dataframe was approximated by applying an Euler-Maruyama scheme. O-U Parameters were obtained with Monte Carlo approximation
def euler_step(row, kappa, M):
    """Function for euler scheme approximation step in modified OH dynamics for temperature simulations
    Inputs:
    - dataframe row with columns: T, Tbar, dTbar and vol
    - kappa: rate of mean reversion
    Output:
    - Temp simulated next day temperatures
    """
    if row['Tbar_shift'] in np.nan:
        T_i = row['Tbar']
    else:
        T_i = row['Tbar_shift']
    T_det = T_i + row['dTbar']
    T_mrev = kappa*(row['Tbar'] - T_i)
    sigma = row['vol']*np.random.randn(M)
    return T_det + T_mrev + sigma

def monte_carlo_temp(trading_dates, Tbar_params, vol_model, first_ord, M=1, kappa=0.88):
    """Monte Carlo simulation of temperature
    Inputs:
    - trading_dates: pandas DatetimeIndex from start to end dates
    - M: number of simulations
    - Tbar_params: parameters used for Tbar model
    - vol_model: fitted volatility model with days in year index
    - first_ord: first ordinal of fitted Tbar model
    Outputs:
    - mc_temps: DataFrame of all components individual components
    - mc_sims: DataFrame of all simulated temperature per iteration
    """
    if isinstance(trading_dates, pd.DatetimeIndex):
        trading_date=trading_dates.map(dt.datetime.toordinal)
    
    # Use Modified Ornstein-Uhlenbeck process as input to generate Tbar DAT
    Tbars = T_model(trading_date-first_ord, *Tbar_params)
    
    # Use derivative of modified OH process SDE to calculate their DAT
    dTbars = df_model(trading_date-first_ord, *Tbar_params)
    
    # Create DataFrame with tht
    mc_temps = pd.DataFrame(data=np.array([Tbars, dTbars]).T, index=trading_dates, columns=['Tbar', 'dTbar'])
    
    # Create columns for day in year
    mc_temps['Day'] = mc_temps.index.dayofyear
    
    # Apply BSpline volatility model depending on day of year
    mc_temps['vol'] = vol_model[mc_temps['Day']-1]
    
    # Shift Tbar by one day (lagged from series)
    mc_temps['Tbar_shift'] = mc_temps['Tbar'].shift(1)
    
    # Apply Euler Step Pandas function
    data = mc_temps.apply(euler_step, args=(kappa, M), axis=1)
    
    # Create final DataFrame of all simulations
    mc_sims = pd.DataFrame(data={x for x in range(M) for y in data.values},
                          index=trading_dates, columns=range(1, M+1))
    
    return mc_temps, mc_sims

# Ornstein-Uhlenbeck process with Modified OH Stochastic Eq. and parameters a, b, alpha, theta.
if isinstance(temp_t.index, pd.DatetimeIndex):
    first_ord = temp_t.index.map(dt.datetime.toordinal)[0]
    temp_t.index=temp_t.index.map(dt.datetime.toordinal)

# Define T
def T_model(x, a, b, alpha, theta):
    omega = 2*np.pi/365.25
    T = a + b*x + alpha*np.sin(omega*x + theta)
    return T

# Define dT
def df_model(x, a, b, alpha, theta):
    omega=2*np.pi/365.25
    df = b + alpha*omega*np.cos(omega*x + theta)
    return df

# Input parameters and plot model
Tbar_params = [62.1, 6.00e-05, 9.03, 1.26]
temp_t['model_fit'] = T_model(temp_t.index-first_ord, *Tbar_params)
if not isinstance(temp_t.index , pd.DatetimeIndex):
    temp_t.index=temp_t.index.map(dt.datetime.fromordinal)

#temp_t[:].plot(figsize=(12,4), style=['s', '^-', 'k--'], markersize=4, linewidth=2 )

# Define trading date range
no_sims = 5
trading_dates = pd.date_range(start='2024-04-22', end='2025-04-22', freq='D')
mc_temps, mc_sims = monte_carlo_temp(trading_dates, Tbar_params, volatility, first_ord, no_sims)

mc_temps

plt.figure(figsize=(12,6))
mc_sims[1].plot(alpha=0.6,linewidth=2, marker='.')
mc_temps["Tbar"].plot(linewidth=4)
plt.legend(loc='lower right')
plt.show()

no_sims = 10000
trade_dates_winter = pd.date_range(start='2023-07-01', end='2023-07-01', freq='D')
mc_temps_winter, mc_sims_winter = monte_carlo_temp(trading_dates_winter, Tbar_params, volatility, first_ord, no_sims)
trading_dates_summer = pd.date_range(start='2023-01-01', end='2023-01-01', freq='D')
mc_temps_summer, mc_sims_summer = monte_carlo_temp(trading_dates_summer, Tbar_params, volatility, first_ord, no_sims)
plt.figure(figsize=(12,6))
plt.title('Winter vs Summer Temperature MC Sims')
Tbar_summer = mc_temps_summer.iloc[-1,:]['Tbar']
Tbar_winter = mc_temps_winter.iloc[-1,:]['Tbar']
plt.hist(mc_sims_summer.iloc[-1,:],bins=20, alpha=0.5, label='Summer', color='tab:orange')
plt.plot([Tbar_summer,Tbar_summer],[0,1600], linewidth=4, label='Tbar_summer', color='tab:orange')
plt.title('Summer vs Winter Temperature MS Sims')
plt.hist(mc_sims_winter.iloc[-1,:],bins=20, alpha=0.5, label='Winter', color='tab:blue')
plt.plot([Tbar_winter,Tbar_winter],[0,1600], linewidth=4, label='Tbar_winter', color='tab:blue')
plt.legend()

# The code below, uses the results obtained in part 5 to price the winter temperature option with the Monte Carlo simulation and the O-U model and compare it to the results obtained with the Black-Scholes MOdel. Code name: WDPricing
# 5.2.1 Data Processing

# Imports libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import datetime as dt
from scipy import integrate
from scipy import stats
from scipy import interpolate
from scipy import special

# Loads data
max_temp = pd.read_csv('maximum_temperature.csv')
min_temp = pd.read_csv('minimum_temperature.csv')

# Cleans data from unnecessary columns, merges the files, and constructs temperature time series with Date, Tmax, and Tmin
def datetime(row):
    return dt.datetime(row.Year, row.Month, row.Day)

max_temp['Date'] = max_temp.apply(datetime, axis=1)
min_temp['Date'] = min_temp.apply(datetime, axis=1)
max_temp.set_index('Date', inplace=True)
min_temp.set_index('Date', inplace=True)
drop_cols = [0, 1, 2, 3, 4, 5, 6]
max_temp.drop(max_temp.columns[drop_cols], axis=1, inplace=True)
min_temp.drop(min_temp.columns[drop_cols], axis=1, inplace=True)
max_temp.rename(columns={'Maximum temperature (Degree F)': 'Tmax'}, inplace=True)
min_temp.rename(columns={'Minimum temperature (Degree F)': 'Tmin'}, inplace=True)
temps = max_temp.merge(min_temp, how='inner', left_on=['Date'], right_on=['Date'])

# Calculates the daily average temperature (DAT) ((Tmax+Tmin)/2) and adds DAT to the Data Frame.
def avg_temp(row):
    return (row.Tmax+row.Tmin)/2

temps['T'] = temps.apply(avg_temp, axis=1)

# Drop null values from data
temps = temps.dropna()
temp_t = temps['T'].copy(deep=True)
temp_t = temp_t.to_frame()
temp_t.set_index('Date', inplace=True)
first_ord = temp_t.index.map(dt.datetime.toordinal)[0]

# Adds a month and day column to the data
temp_vol = temps['T'].copy(deep=True)
temp_vol = temp_vol.to_frame()
temp_vol['Day'] = temp_vol.index.dayofyear
temp_vol['month'] = temp_vol.index.month

# Constructs time series with volatility
vol = temp_vol.groupby(['Day'])['T'].agg(['mean','std'])
days = np.array(vol['std'].index)
T_std = np.array(vol['std'].values)
temp_t.head()

# Uses B-Spline and interpolates DAT data with B-spline and calculates Ornstein-Uhlenbeck terms Model with previously obtained parameters (see WDDataProcessing code)

# T = a+bx+a1sin((omega)hx+theta)+b1cos((omega)x+phi)
Tbar_params = [62.1, 6.00e-05, 9.03, 1.26]

def T_model(x, a, b, alpha, theta):
    omega = 2*np.pi/365.25
    T = a + b*x + alpha*np.sin(omega*x + theta)
    return T

def dT_model(x, a, b, alpha, theta):
    omega=2*np.pi/365.25
    dT = b + alpha*omega*np.cos(omega*x + theta)
    return dT

def spline(knots, x, y):
    x_new = np.linspace(0, 1, knots+2)[1:-1]
    t, c, k = interpolate.splrep(x, y, t=np.quantile(x, x_new), s=3)
    yfit = interpolate.BSpline(t, c, k)(x)
    return yfit

# Uses B-Spline and interpolates DAT data with B-spline and calculates Ornstein-Uhlenbeck terms Model with previously obtained parameters (see WDDataProcessing code)

# T = a+bx+a1sin((omega)x+theta)+b1cos((omega)x+phi)
Tbar_params = [62.1, 6.00e-05, 9.03, 1.26]

def T_model(x, a, b, alpha, theta):
    omega = 2*np.pi/365.25
    T = a + b*x + alpha*np.sin(omega*x + theta)
    return T

def dT_model(x, a, b, alpha, theta):
    omega = 2*np.pi/365.25
    dT = b + alpha*omega*np.cos(omega*x + theta)
    return dT

def spline(knots, x, y):
    x_new = np.linspace(0, 1, knots+2)[1:-1]
    t, c, k = interpolate.splrep(x, y, t=np.quantile(x, x_new), s=3)
    yfit = interpolate.BSpline(t, c, k)(x)
    return yfit

# Apply Euler approximation to time series.
def euler_step(row, kappa, M, lamda):
    """Function for Euler scheme approximation step in modified OU dynamics for temperature simulations
    Inputs:
    - dataframe row with columns: T, Tbar, dTbar and vol
    - kappa: rate of mean reversion from data preprocessing
    Output:
    - temp: simulated next day temperatures
    """
    if row['T'] in np.nan:
        T_i = row['Tbar']
    else:
        T_i = row['T']
    T_det = T_i + row['dTbar']
    T_mrev = kappa*(row['Tbar'] - T_i)
    sigma = row['vol']*np.random.randn(M)
    riskn = lamda*row['vol']
    return T_det + T_mrev + sigma - riskn

# Apply Monte Carlo approximation to time series.
def monte_carlo_temp(trading_dates, Tbar_params, vol_model, first_ord, M=1, lamda=0):
    """Monte Carlo simulation of temperature
    Inputs:
    - trading_dates: pandas DatetimeIndex from start to end dates
    - M: number of simulations
    - Tbar_params: parameters used for Tbar model
    - vol_model: fitted volatility model with days in year index
    - first_ord: first ordinal of fitted Tbar model
    Outputs:
    - mc_temps: DataFrame of all components and simulated temperatures
    """
    kappa=0.438
    if isinstance(trading_dates, pd.DatetimeIndex):
        trading_date=trading_dates.map(dt.datetime.toordinal)

    Tbars = T_model(trading_date-first_ord, *Tbar_params)
    dTbars = dT_model(trading_date-first_ord, *Tbar_params)
    mc_temps = pd.DataFrame(data=np.array([Tbars, dTbars]).T, index=trading_dates, columns=['Tbar', 'dTbar'])

    mc_temps['Day'] = mc_temps.index.dayofyear
    mc_temps['vol'] = vol_model[mc_temps['Day']-1]
    mc_temps['T'] = mc_temps['Tbar'].shift(1)
    data = mc_temps.apply(euler_step, args=(kappa, M, lamda), axis=1)
    mc_sims = pd.DataFrame(data={x for x in range(M) for y in data.values},
                           index=trading_dates, columns=range(1, M+1))

    return mc_temps, mc_sims

## 5.2.1. Trading range was defined and models were applied.
# Define trading date range
S = '2024-05-01'
E = '2024-11-01'

trading_dates = pd.date_range(start=S, end=E, freq='D')
volatility = spline(5, days, T_std)
mc_temps, mc_sims = monte_carlo_temp(trading_dates, Tbar_params, volatility, first_ord)

plt.figure(figsize=(10, 6))
mc_sims[1].plot(alpha=0.5, linewidth=1, marker='.')
mc_temps["Tbar"].plot(linewidth=3)
plt.legend(loc='lower right')
plt.show()


# Calculate probability of no payoff within time range.
trading_dates = pd.date_range(start=S, end=E, freq='D')
volatility = spline(5, days, T_std)
mc_temps, mc_sims = monte_carlo_temp(trading_dates, Tbar_params, volatility, first_ord)

print('Probability P(max(65-Tn, 0) = 0): {0:1.1f}%'.format(len(mc_sims[mc_sims[1] >= 65]) / len(mc_sims) * 100))

def rn_mean(time_arr, vol_arr, Tbars, lamda, kappa):
    """
    Evaluate the risk neutral integral above for each segment of constant volatility
    Rectangular integration with step size of days
    """
    dt = 1/365.25
    N = len(time_arr)
    mean_intervals = -vol_arr*(1 - np.exp(-kappa*dt))/kappa
    return 65*N - (np.sum(Tbars) - lamda*np.sum(mean_intervals))

def rn_var(time_arr, vol_arr, kappa):
    """
    Evaluate the risk neutral integral above for each segment of constant volatility
    Rectangular integration with step size of days
    """
    dt = 1/365.25
    var_arr = np.power(vol_arr, 2)
    var_intervals = var_arr/(2*kappa)*(1-np.exp(-2*kappa*dt))
    cov_sum = 0
    for i, ti in enumerate(time_arr):
        for j, tj in enumerate(time_arr):
            if j > i:
                cov_sum += np.exp(-kappa*(tj-ti)) * var_intervals[i]
    return np.sum(var_intervals) + 2*cov_sum

def risk_neutral(trading_dates, Tbar_params, vol_model, first_ord, lamda, kappa=0.438):
    if isinstance(trading_dates, pd.DatetimeIndex):
        trading_date=trading_dates.map(dt.datetime.toordinal)

    Tbars = T_model(trading_date-first_ord, *Tbar_params)
    dTbars = dT_model(trading_date-first_ord, *Tbar_params)
    mc_temps = pd.DataFrame(data=np.array([Tbars, dTbars]).T, index=trading_dates, columns=['Tbar','dTbar'])

    mc_temps['day'] = mc_temps.index.dayofyear
    mc_temps['vol'] = vol_model[mc_temps['day']-1]
    time_arr = np.array([i/365.25 for i in range(1, len(trading_dates)+1)])
    vol_arr = mc_temps['vol'].values
    mu_rn = rn_mean(time_arr, vol_arr, Tbars, lamda, kappa)
    var_rn = rn_var(time_arr, vol_arr, kappa)
    return mu_rn, var_rn

def winter_option(trading_dates, r, alpha, K, tau, opt='c', lamda=0.0):
    """Evaluate the fair value of temperature option in winter
    Based on heating degree days only if the physical probability that
    the average temperature exceeds the Tref (65 deg F) is close to 0
    """
    mu_rn, var_rn = risk_neutral(trading_dates, Tbar_params, volatility, first_ord, lamda)
    disc = np.exp(-r*tau)
    vol_rn = np.sqrt(var_rn)
    zt = (K - mu_rn)/vol_rn
    exp = np.exp(-zt**2/2)
    if opt == 'c':
        return alpha*disc*((mu_rn - K)*stats.norm.cdf(-zt) + vol_rn*exp/np.sqrt(2*np.pi))
    else:
        exp2 = np.exp(-mu_rn**2/(2*vol_rn**2))
        return alpha*disc*((K - mu_rn)*(stats.norm.cdf(zt) - stats.norm.cdf(-mu_rn/vol_rn)) + 
                           vol_rn/np.sqrt(2*np.pi)*(exp-exp2))

trading_dates = pd.date_range(start=S, end=E, freq='D')
r=0.05
K=300
alpha=2500

def years_between(d1, d2):
    d1 = dt.datetime.strptime(d1, "%Y-%m-%d")
    d2 = dt.datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)/365.25

start = dt.datetime.today().strftime("%Y-%m-%d")
end = E
tau = years_between(start, end)
print('Start Valuation Date:', start,
      '\nEnd of Contract Date:', end,
      '\nYears between Dates:', round(tau,3))
print('Call Price:', round(winter_option(trading_dates, r, alpha, K, tau, 'c'), 2))
print('Put Price:', round(winter_option(trading_dates, r, alpha, K, tau, 'p'), 2))

# Define trading date range
trading_dates = pd.date_range(start=S, end=E, freq='D')
no_sims = 10000
vol_model = spline(5, days, T_std)

def temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, K, tau, first_ord, opt='c'):
    "Evaluates the price of a temperature call option"
    mc_temps, mc_sims = monte_carlo_temp(trading_dates, Tbar_params, volatility, first_ord, no_sims)
    N, M = np.shape(mc_sims)
    mc_arr = mc_sims.values
    DD = np.sum(np.maximum(65 - mc_arr, 0), axis=0)
    if opt == 'c':
        CT = alpha * np.maximum(DD - K, 0)
    else:
        CT = alpha * np.maximum(K - DD, 0)
    C0 = np.exp(-r * tau) * np.sum(CT / M)
    sigma = np.sqrt(np.sum((np.exp(-r * tau) * CT - C0)**2) / (M - 1))
    SE = sigma / np.sqrt(M)
    return C0, SE

call = np.round(temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, K, tau, first_ord, 'c'), 2)
put = np.round(temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, K, tau, first_ord, 'p'), 2)
print('Call Price: {0} +/- {1} (2se)'.format(call[0], call[1] * 2))
print('Put Price: {0} +/- {1} (2se)'.format(put[0], put[1] * 2))

# Compare Black Scholes with MC Simulations Method
strikes = np.arange(400, 1600, 50)
data = np.zeros(shape=(len(strikes), 4))
for i, strike in enumerate(strikes):
    data[i, 0] = temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, strike, tau, first_ord, 'c')[0]
    data[i, 1] = winter_option(trading_dates, r, alpha, strike, tau, 'c')
    data[i, 2] = temperature_option(trading_dates, no_sims, Tbar_params, vol_model, r, alpha, strike, tau, first_ord, 'p')[0]
    data[i, 3] = winter_option(trading_dates, r, alpha, strike, tau, 'p')

df = pd.DataFrame({'MC Call': data[:, 0], 'BSA Call': data[:, 1], 'MC Put': data[:, 2], 'BSA Put': data[:, 3]})
df.index = strikes
plt.plot(df)
plt.title('Winter Temperature Options')
plt.ylabel('Option Price USD')
plt.xlabel('Strikes (HDD)')
plt.legend(df.columns, loc=4)
plt.show()


