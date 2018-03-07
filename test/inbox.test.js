const assert = require('assert');
const ganache = require('ganache-cli'); // ethereum RPC for testing
const Web3 = require('web3'); // constructor function

// create instance of web3 with ganache provider
const web3 = new Web3(ganache.provider());

// Testing with Mocha
beforeEach(() => {
  // fetch all accounts from ganache network
  web3.eth.getAccounts()
          .then(fetchedAccounts => {
            console.log(fetchedAccounts);
          });
  // use one of the returned accounts to deploy contract
});

describe('Inbox', () => {
  it('deploys a contract', () => {

  });
});
