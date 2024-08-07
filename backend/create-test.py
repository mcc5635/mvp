import pandas as pd
import numpy as np
import datetime

# Generate a date range for one month
date_range = pd.date_range(start='1859-01-01', end='2023-01-31')
# Create synthetic data with metadata
np.random.seed(42)  # For reproducibility

# Simulate temperature data
max_temperatures = np.random.normal(loc=76, scale=5, size=len(date_range))
min_temperatures = np.random.normal(loc=60, scale=5, size=len(date_range))

# Create DataFrames for maximum and minimum temperatures
max_temp_df = pd.DataFrame({
    'Product code': 'IDCJAC0010',
    'Station number': 66062,
    'Year': date_range.year,
    'Month': date_range.month,
    'Day': date_range.day,
    'Maximum temperature (Degree F)': max_temperatures,
    'Days of accumulation of maximum temperature': 1.0,  # Assuming a constant value for simplicity
    'Quality': 'Y'
})

min_temp_df = pd.DataFrame({
    'Product code': 'IDCJAC0011',
    'Station number': 66062,
    'Year': date_range.year,
    'Month': date_range.month,
    'Day': date_range.day,
    'Minimum temperature (Degree F)': min_temperatures,
    'Days of accumulation of minimum temperature': 1.0,  # Assuming a constant value for simplicity
    'Quality': 'Y'
})

# Save to CSV
max_temp_df.to_csv('./data/maximum_temperature.csv', index=False)
min_temp_df.to_csv('./data/minimum_temperature.csv', index=False)

max_temp_df.head(), min_temp_df.head()
print(max_temp_df)