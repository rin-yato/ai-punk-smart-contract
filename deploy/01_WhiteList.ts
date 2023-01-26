import { ethers, network } from 'hardhat';
import { WhiteList, WhiteList__factory } from '../typechain-types';
import { verfiy } from '../utils/GlobalHelper';

export default async function main() {
    console.log('Deploying WhiteList...');
    const WhiteListFactory: WhiteList__factory = await ethers.getContractFactory('WhiteList');
    const whiteList: WhiteList = await WhiteListFactory.deploy(200);
    await whiteList.deployed();
    console.log('WhiteList deployed to:', whiteList.address);

    console.log(await whiteList.maxWhiteListedAddresses())


    const chainId = network.config.chainId;
    if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        // Don't forget to wait 6 blocks until the transaction is mined!
        await whiteList.deployTransaction.wait(6);



        // Don't forget to pass the constructor arguments!
        await verfiy(whiteList.address, [200]); 
    }
}

main.tags = ['All', 'WhiteList'];
