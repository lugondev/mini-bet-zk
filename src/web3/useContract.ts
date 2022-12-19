import { useContract, useProvider } from "wagmi";
import { ZK_BID } from "./constants";
import ZKAbi from "./contracts/abi/ZkBid.json";

export const useContractZkBid = (_provider?: any) => {
  const provider = useProvider();
  const contractInstance = useContract({
    address: ZK_BID,
    abi: ZKAbi,
    signerOrProvider: _provider || provider,
  });

  return contractInstance;
};
