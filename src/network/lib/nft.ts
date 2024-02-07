import { ContractFactory, Signer, ethers, ContractTransaction } from "ethers";
import { abi, byteCode } from "../../constants/contractData";


import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import { config } from '../../configuration/Config'
import { type WalletClient, useWalletClient } from 'wagmi'
import { providers } from 'ethers'


const overrides = {
  // gasLimit: ethers.utils.parseUnits("20000000", "wei"),
};

interface DeploymentResult {
  success: boolean;
  contractAddress?: string;
  error?: string;
  txid?:string
}

export const deployContract = async (
  name: any,
  symbol: any,
  signer: any
): Promise<DeploymentResult> => {
  try {
    const a=walletClientToSigner(signer)
    const factory = new ethers.ContractFactory(abi, byteCode,  a);
    const contract = await factory.deploy(name, symbol, overrides);
    const data = await contract.deployTransaction.wait();
    const contractAddress = data.contractAddress;
    const txid = data.transactionHash; 

    console.log("Deployed at address: ", contractAddress);
    console.log("Transaction ID: ", txid);

    return { success: true, contractAddress, txid };
  } catch (err: any) {
    console.error(err);

    return {
      success: false,
      error: err.message || "An error occurred during deployment.",
    };
  }
};

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

export const mintNFT=async(imageURI,accountAddress,contractAddress)=>{
  try {
    console.log("here")
    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: abi,
      functionName: 'mint',
      args: [accountAddress,imageURI],
    })
    const { data, write } = useContractWrite(config)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
    write?.()
  console.log(data)
    
  } catch (error) {
    console.log(error)
  }
}

