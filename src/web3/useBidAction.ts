import { useToggle } from "./../hooks/useToggle";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSigner } from "wagmi";
import { useContractZkBid } from "./useContract";

export const useBidAction = () => {
  const { data: signerData } = useSigner();
  const zkBidInstance = useContractZkBid(signerData);
  const [api, contextHolder] = notification.useNotification();

  const getOwner = async () => {
    return await zkBidInstance?.owner();
  };

  const getVerifier = async () => {
    return await zkBidInstance?.verifier();
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
    } catch (e) {}
  };

  const onEndBidding = async () => {
    const tx = await zkBidInstance?.endBidding();
    await tx.wait();
  };

  return {
    getOwner,
    getVerifier,
    checkBiddingOpen,
    checkBiddingEnd,
    onStartBidding,
    onEndBidding,
  };
};

export const usePreCheck = () => {
  const {
    getOwner,
    getVerifier,
    checkBiddingOpen,
    checkBiddingEnd,
    onEndBidding,
    onStartBidding,
  } = useBidAction();

  const [loading, setLoading] = useToggle(false);
  const [state, setState] = useState<{
    owner: string;
    verifier: string;
    isBidding: boolean;
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
        });
        setLoading();
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    ...state,
  };
};
