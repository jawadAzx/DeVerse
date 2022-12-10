const Maincontract = artifacts.require("Maincontract");
// const UserContract = artifacts.require("UserContract");
module.exports = function (deployer) {
    deployer.deploy(Maincontract);
    // deployer.deploy(UserContract);
}
