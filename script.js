const MyContract = artifacts.require("./UICBuilding.sol");

module.exports = async function(callback) {
  const contract = await MyContract.deployed()
  const value = await contract.getBuilindingAddress(1)
  console.log("Value:", value)
}