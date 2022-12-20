import { useGetDataPlayer } from "./useGetListPlayer";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount, useSigner } from "wagmi";
import { useToggle } from "./../hooks/useToggle";
import { useContractZkBid } from "./useContract";

export const useBidAction = () => {
  const { data: signerData } = useSigner();
  const zkBidInstance = useContractZkBid(signerData);

  const getOwner = async () => {
    return await zkBidInstance?.owner();
  };

  const getVerifier = async () => {
    return await zkBidInstance?.verifier();
  };

  const hasBidding = async (address: string) => {
    return (await zkBidInstance?.bidHashes(address)) as boolean;
  };

  const checkBiddingOpen = async () => {
    return await zkBidInstance?.biddingOpen();
  };

  const checkBiddingEnd = async () => {
    const tx = await zkBidInstance?.biddingEnd();
    toast.promise(tx.wait(), {
      loading: "Loading",
      success: "Got the data",
      error: "Error when fetching",
    });
  };

  const onStartBidding = async () => {
    try {
      const tx = await zkBidInstance?.startBidding();
      toast.promise(tx.wait(), {
        loading: "Loading",
        success: "Got the data",
        error: "Error when fetching",
      });
      return tx;
    } catch (e) {}
  };

  const onEndBidding = async () => {
    const tx = await zkBidInstance?.endBidding();
    await tx.wait();
  };

  return {
    getOwner,
    getVerifier,
    hasBidding,
    checkBiddingOpen,
    checkBiddingEnd,
    onStartBidding,
    onEndBidding,
  };
};

export const usePreCheck = () => {
  const [fork, setFork] = useState(false);
  const { getOwner, getVerifier, checkBiddingOpen, hasBidding } =
    useBidAction();

  const [loading, setLoading] = useToggle(false);

  const [state, setState] = useState<{
    owner?: string;
    verifier?: string;
    isBidding?: boolean;
    hasBidding?: boolean;
  }>();

  useEffect(() => {
    setLoading();
    Promise.all([getOwner(), getVerifier(), checkBiddingOpen()]).then(
      (data) => {
        const [owner, verifier, biddingOpen] = data;
        setState({
          owner,
          verifier,
          isBidding: biddingOpen,
          hasBidding: false,
        });
        setLoading();
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fork]);
  return {
    loading,
    ...state,
    setState,
    setFork,
  };
};

export const useCheckHasBidding = () => {
  const { hasBidding: onCheckBidding } = useBidAction();

  const [loading, setLoading] = useToggle(false);
  const { isConnected, address } = useAccount();
  const [hasBidding, setHasBidding] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      setLoading();
      Promise.all([onCheckBidding(address)]).then((data) => {
        const [hasBidding] = data;
        setHasBidding(+hasBidding > 0);
        setLoading();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return {
    hasBidding,
    loading,
  };
};
