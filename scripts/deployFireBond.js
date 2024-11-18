const { artifacts, ethers, upgrades } = require('hardhat')
const getNamedSigners = require('../utils/getNamedSigners')
const saveToConfig = require('../utils/saveToConfig')
const readFromConfig = require('../utils/readFromConfig')
const deploySettings = require('./deploySettings')

async function main () {

  const chainId = await hre.getChainId()
  console.log("STARTING FIRELINK BRIDGE DEPLOYMENT ON ", chainId)

  const CHAIN_NAME = deploySettings[chainId].CHAIN_NAME

  const initialOwner = "0x8137147256EF84caea5322C4A9BE7209f0709dd7"
  const relayer = "0x0000000000000000000000000000000000000000"
  const otherBridge = "0x0000000000000000000000000000000000000000"

  console.log('Deploying Flarebond Bridge Smart Contract')
  const {payDeployer} =  await getNamedSigners();
  console.log('Deploying using Owner Address: ', payDeployer.address)

  const Flarebond_Bridge_Contract = await ethers.getContractFactory('FlarebondBridge')
  Flarebond_Bridge_Contract.connect(payDeployer)

  const FlarebondBridgeABI = (await artifacts.readArtifact('FlarebondBridge')).abi
  await saveToConfig(`FlarebondBridge`, 'ABI', FlarebondBridgeABI, chainId)

  const flarebondBridgeContract = await upgrades.deployProxy(Flarebond_Bridge_Contract, [initialOwner, relayer, otherBridge], { initializer: 'initialize', kind:'uups' })
  await flarebondBridgeContract.deployed()

  await saveToConfig(`FlarebondBridge`, 'ADDRESS', flarebondBridgeContract.address, chainId)
  console.log('FlarebondBridge contract deployed to:', flarebondBridgeContract.address, ` on ${CHAIN_NAME}`)

  console.log('Verifying FlarebondBridge Contract...')
  try {
    const currentImplAddress = await upgrades.erc1967.getImplementationAddress(flarebondBridgeContract.address)
    console.log('current implementation address: ', currentImplAddress)
    await run('verify:verify', {
      address: currentImplAddress,
      contract: 'contracts/FlarebondBridge.sol:FlarebondBridge', // Filename.sol:ClassName
      constructorArguments: [],
      network: deploySettings[chainId].NETWORK_NAME
    })
  } catch (error) {
    console.log(error)
  }

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
