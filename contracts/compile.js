const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const contractPath = path.resolve(__dirname, 'SampleToken.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'SampleToken.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const abi = output.contracts['SampleToken.sol']['SampleToken'].abi;
const bytecode = output.contracts['SampleToken.sol']['SampleToken'].evm.bytecode.object;

module.exports = { abi, bytecode };
