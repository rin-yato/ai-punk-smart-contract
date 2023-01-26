import { run } from "hardhat";

export async function verfiy(contractAddress: string, args: any[]) {
    console.log('Verifying...');
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error: any) {
        if (error.message.includes('Contract source code already verified')) {
            console.log('Contract source code already verified');
        } else {
            throw error;
        }
    }
    console.log('Verified!');
}