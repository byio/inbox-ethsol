const assert = require('assert');
const ganache = require('ganache-cli'); // ethereum RPC for testing
const Web3 = require('web3'); // constructor function

// Import Compiled Solidity Contract
const { interface, bytecode } = require('../compile');

// create instance of web3 with ganache provider
const provider = ganache.provider();
const web3 = new Web3(provider);

// Declare vars
let accounts;
let inbox;
const INITIAL_MESSAGE = "This is the initial/default message."

// Testing with Mocha
beforeEach(async () => {
  // fetch all accounts from ganache network
  accounts = await web3.eth.getAccounts();
  // use one of the returned accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({
                          data: bytecode,
                          arguments: [
                            INITIAL_MESSAGE
                          ]
                        })
                        .send({
                          from: accounts[0],
                          gas: 1000000
                        });
  inbox.setProvider(provider);
});

describe('Inbox', () => {

  it('deploys a contract', () => {
    // test to see if contract has an address (deployed contracts have an address)
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });
});
