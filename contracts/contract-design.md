
-----| functions-insurance |-----

|
| # Contract Engine for Sepolia deployment via Etherscan
|
|-- contracts/
|   |-- ParametricInsurance.sol                   # Step 1
|   |-- dev/
|       |-- Functions.sol                         # Step 2
|       |-- FunctionsClient.sol                   # Step 3
|       |-- FunctionsBillingRegistryInterface.sol # Step 4
|       |-- interfaces/
|           |-- FunctionsOracleInterface.sol      # Step 5
|           |-- FunctionsClientInterface.sol      # Step 6
|       |-- vendor/
|           |-- @ensdomains/
|           |   |-- buffer/
|           |       |-- 0.1.0/
|           |           |-- Buffer.sol            # Step 7
|           |-- solidity-cborutils/
|               |-- 2.0.0/
|                   |-- CBOR.sol                  # Step 8