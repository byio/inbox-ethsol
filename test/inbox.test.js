const assert = require('assert');
const ganache = require('ganache-cli'); // ethereum RPC for testing
const Web3 = require('web3'); // constructor function

// Import Compiled Solidity Contract
const { interface, bytecode } = require('../compile');

// create instance of web3 with ganache provider
const web3 = new Web3(ganache.provider());

// Declare vars
let accounts;
let inbox;

// Testing with Mocha
beforeEach(async () => {
  // fetch all accounts from ganache network
  accounts = await web3.eth.getAccounts();
  // use one of the returned accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({
                          data: bytecode,
                          arguments: [
                            'Hi there!'
                          ]
                        })
                        .send({
                          from: accounts[0],
                          gas: 1000000
                        });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // test to see if contract has an address (deployed contracts have an address)
    assert.ok(inbox.options.address);
  });
});
