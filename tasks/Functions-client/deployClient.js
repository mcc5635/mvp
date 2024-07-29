const { types } = require("hardhat/config")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")

task("functions-deploy-client", "Deploys the ParametricInsurance contract")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain. Specify a valid network or simulate a ParametricInsurance request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying ParametricInsurance contract to ${network.name}`)

    const oracleAddress = networkConfig[network.name]["functionsOracleProxy"]
    const requestConfig = require("../../Functions-request-config.js")

    console.log("Oracle Address:", oracleAddress)
    console.log("Request Config Client Address:", requestConfig.secrets.clientAddress)

    if (!oracleAddress) {
      throw new Error(`No functionsOracleProxy address set for network ${network.name}`)
    }

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const clientContractFactory = await ethers.getContractFactory("ParametricInsurance")

    console.log("Deploying contract with Oracle Address and Client Address")

    try {
      const clientContract = await clientContractFactory.deploy(oracleAddress, requestConfig.secrets.clientAddress)

      console.log(
        `\nWaiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${clientContract.deployTransaction.hash} to be confirmed...`
      )
      await clientContract.deployTransaction.wait(VERIFICATION_BLOCK_CONFIRMATIONS)

      const verifyContract = taskArgs.verify

      if (verifyContract && (process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY)) {
        try {
          console.log("\nVerifying contract...")
          await clientContract.deployTransaction.wait(Math.max(6 - VERIFICATION_BLOCK_CONFIRMATIONS, 0))
          await run("verify:verify", {
            address: clientContract.address,
            constructorArguments: [oracleAddress, requestConfig.secrets.clientAddress],
          })
          console.log("Contract verified")
        } catch (error) {
          if (!error.message.includes("Already Verified")) {
            console.log("Error verifying contract. Delete the build folder and try again.")
            console.log(error)
          } else {
            console.log("Contract already verified")
          }
        }
      } else if (verifyContract) {
        console.log("\nPOLYGONSCAN_API_KEY or ETHERSCAN_API_KEY missing. Skipping contract verification...")
      }

      console.log(`\ParametricInsurance contract deployed to ${clientContract.address} on ${network.name}`)
    } catch (error) {
      if (error.code === "INSUFFICIENT_FUNDS") {
        console.log("Insufficient funds for gas * price + value. Please ensure your wallet has enough funds.")
      } else {
        console.log("An unexpected error occurred:")
        console.log(error)
      }
    }
  })
