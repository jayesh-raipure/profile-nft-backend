'use strict';

// const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./utils/CAUtils.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');
const path = require("path");

const { Gateway, Wallets } = require("fabric-network");

async function ConnectToNetwork() {
  const org1UserID = "appUser";
  const channelName = "mychannel";
  const chainCodeName = "basic";

  //! Path to wallet where identities are stored.
  const walletPath = path.join(__dirname, "wallet");

  const ccp = buildCCPOrg1();

  // Setup the wallet to hold the credentials of the application user
  const wallet = await buildWallet(Wallets, walletPath);

  //! Create Gateway
  const gateway = new Gateway();

  //! Connect Gateway to Network
  await gateway.connect(ccp, {
    wallet,
    identity: org1UserID,
    discovery: { enabled: true, asLocalhost: true },
  });

  //! Get Network object
  const network = await gateway.getNetwork(channelName);

  //! Get contract object
  const contract = await network.getContract(chainCodeName);

  return { gateway, network, contract };
}

module.exports = ConnectToNetwork;