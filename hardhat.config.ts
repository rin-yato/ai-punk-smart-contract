import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import 'dotenv/config';
import 'hardhat-gas-reporter';
import '@typechain/hardhat'

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || '';
const GOERLI_URL = process.env.GOERLI_RPC_URL || ''; 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
        url: GOERLI_URL,
        accounts: [GOERLI_PRIVATE_KEY!],
        chainId: 5,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
