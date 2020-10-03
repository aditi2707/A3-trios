var election = artifacts.require("./election.sol");

module.exports = function(deployer) {
  deployer.deploy(election);
};