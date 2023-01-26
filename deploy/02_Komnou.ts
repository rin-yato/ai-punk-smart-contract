import { ethers, network } from "hardhat";
import { Komnou, Komnou__factory } from "../typechain-types";
import { verfiy } from "../utils/GlobalHelper";


export default async function main() {
   console.log('Deploying Komnou...')
    const KomnouFactory: Komnou__factory = await ethers.getContractFactory("Komnou");
    const Komnou: Komnou = await KomnouFactory.deploy('https://gateway.pinata.cloud/ipfs/QmZbzW22j45KzpUZSZHHwFVRkF2tGD9ExPkCj8gc95KGuH/');
    await Komnou.deployed();
    console.log("Komnou deployed to:", Komnou.address);
    
    const chainId =  network.config.chainId;
    // Verify the contract on Etherscan
    if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        await Komnou.deployTransaction.wait(6);
        await verfiy(Komnou.address, ['https://gateway.pinata.cloud/ipfs/QmZbzW22j45KzpUZSZHHwFVRkF2tGD9ExPkCj8gc95KGuH/'])
    }
}


main.tags = ['All', 'Komnou'];