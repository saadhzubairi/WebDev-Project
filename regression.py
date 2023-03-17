import pandas as pd
import numpy as np
import statsmodels.api as sm

data = pd.read_csv('Book.csv')

X = data[[
          'GDP per capita growth rate ^2',
          'Population Growth',
          'FDI net inflows',
          'Fuel imports',
          'Inflation - consumer prices',
          'Trade openness - Trade',
          'Change in Length of Roads',
          'Motor vehicles',
          'Energy intensity',
          'Urbanisation rate',
          'Population density']]
y = data['CO2 emissions from transport']

X = sm.add_constant(X)

model = sm.OLS(y, X).fit()

print(model.summary())

results = pd.DataFrame({'coefficients': model.params, 'standard errors': model.bse,
                       't values': model.tvalues, 'p values': model.pvalues})

# Save the dataframe as a CSV file
results.to_csv('results.csv', index_label='variable')

with open('model_summary.csv', 'w') as file:
    file.write(model.summary().as_csv())
