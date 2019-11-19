var Healthchain = artifacts.require("./Healthchain.sol");

module.exports = function(deployer) {
  deployer.deploy(Healthchain);
};
