import { Signer } from "ethers";
import { useMemo } from "react";
import { ZK_BID } from "./constants";
import { ZkBid__factory } from "./contracts/factories/ZkBid__factory";

export const useBidContract = (signer: any): ZkBid__factory => {
  return useMemo(() => ZkBid__factory.connect(ZK_BID, signer), [signer]);
};
