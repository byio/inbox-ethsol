const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

// import ABI (interface) and bytecode from compile.js
const { interface, bytecode } = require('./compile');

// retrieve mnemonic from .env file
const dotenv = require('dotenv');
dotenv.config();

// create instance of HDWalletProvider to be passed into instance of web3
const provider = new HDWalletProvider(
  process.env.ETH_MNEMONIC,
  process.env.INFURA_URL_API_KEY
);

// create instance of web3 using provider instance above
const web3 = new Web3(provider);

// deploy method (purpose of declaring a deploy method is to allow async/await usage)
const deploy = async () => {
  // fetch array of accounts
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from acccount:', accounts[0]);
  // create contract to deploy to rinkeby network (as specified in INFURA_URL_API_KEY)
  const result = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({ data: bytecode, arguments: ['Initial message. Rinkeby Deploy.'] })
                .send({ from: accounts[0], gas: '1000000' });
  console.log('Contract deployed at the following address:', result.options.address);
};

// invoke deploy() method
deploy();
