import { assert } from "chai";
import { ethers } from "hardhat";
import { WhiteList, WhiteList__factory } from "../typechain-types";


describe('WhiteListTest', () => {

    let whiteList: WhiteList;
    let whiteListFactory: WhiteList__factory;

    beforeEach(async () => {
        whiteListFactory = await ethers.getContractFactory('WhiteList');
        whiteList = await whiteListFactory.deploy(200);
    });

    it('should deploy', async () => {
        assert.exists(whiteList.address);
    });

    it('should set maxSupply', async () => {
        assert.equal(await whiteList.maxWhiteListedAddresses(), 200);
    });

    it('should add address to whitelist', async () => {
        const address = ethers.provider.getSigner(0).getAddress();
        await whiteList.addAddressToWhiteList();
        assert.equal(await whiteList.whiteListedAddresses(address), true);
    }); 

    it('should not add address to whitelist if maxSupply is reached', async () => {
        const testMaxSupplyContract = await whiteListFactory.deploy(1);

        await testMaxSupplyContract.addAddressToWhiteList();

        const tx = testMaxSupplyContract.addAddressToWhiteList();
        await assert.isRejected(tx, 'WhiteListFull');
    });

    it('should not add address to whitelist if address is already whitelisted', async () => {
        await whiteList.addAddressToWhiteList();
        const tx = whiteList.addAddressToWhiteList();
        await assert.isRejected(tx, 'AddressAlreadyWhiteListed');
    });

});