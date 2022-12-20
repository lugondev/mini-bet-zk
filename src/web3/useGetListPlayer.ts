import { useToggle } from "./../hooks/useToggle";
import { multicall } from "@wagmi/core";

import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import ZKAbi from "../web3/contracts/abi/ZkBid.json";
import { useContractZkBid } from "./useContract";

export const useGetDataPlayer = () => {
  const { data } = useSigner();
  const contractInstance = useContractZkBid(data);

  const get = async () => {
    if (!contractInstance) return [];
    const contractInfo = {
      address: contractInstance.address,
      abi: ZKAbi,
    };
    const totalUserBidding = await contractInstance?.totalUsersBidding();
    const contracts = [...new Array(+totalUserBidding).keys()].map((i) => ({
      ...contractInfo,
      functionName: "getUserByIndex",
      args: [+i],
    }));

    const _dataUserByIndex = await multicall({
      contracts: contracts,
    });

    const _dataUser = await Promise.all([
      multicall({
        contracts: _dataUserByIndex.map((user) => ({
          ...contractInfo,
          functionName: "bidHashes",
          args: [user],
        })),
      }),
      multicall({
        contracts: _dataUserByIndex.map((user) => ({
          ...contractInfo,
          functionName: "bidValues",
          args: [user],
        })),
      }),
    ]);

    const _data = [...new Array(+totalUserBidding).keys()].map((i) => {
      return {
        key: i + 1,
        address: _dataUserByIndex[i],
        bidHash: _dataUser[0][i],
        bidValue: _dataUser[1][i],
        // isReveal: _dataUser[1][i],
        tags: [Number(_dataUser[1][i]) > 0 ? "Ready" : "Not Ready"],
      };
    });
    return _data;
  };

  return get;
};

export const useGetPlayers = () => {
  const { data } = useSigner();
  const contractInstance = useContractZkBid(data);

  const [loading, setLoading] = useToggle(false);
  const [state, setState] = useState<Array<any>>([]);

  const get = useGetDataPlayer();
  useEffect(() => {
    if (contractInstance) {
      setLoading();
      get()
        .then((data) => {
          setState(data);
        })
        .finally(setLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { dataList: state, loading };
};
