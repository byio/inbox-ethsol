const assert = require('assert');
const ganache = require('ganache-cli'); // ethereum RPC for testing
const Web3 = require('web3'); // constructor function

// create instance of web3 with ganache provider
const web3 = new Web3(ganache.provider());
