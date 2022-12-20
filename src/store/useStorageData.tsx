import create from "zustand";
import { keyBy } from "lodash-es";

type TDataList = {
  key: string;
  address: string | unknown;
  bidHash: string | number | unknown;
  bidValue: string | number | unknown;
  tags: string[];
};

export interface IStorageData {
  owner: string;
  verifier: string;
  sender: string;
  biddingOpen: boolean;
  biddingEnd: boolean;
  bidHashes: number;
  totalBids: number;
  dataList: Array<TDataList> | null;
}

const initialValues = {
  owner: "",
  verifier: "",
  sender: "",
  bidHashes: 0,
  biddingOpen: false,
  biddingEnd: false,
  totalBids: 0,
  dataList: null,
};

export const useStorageData = create<
  IStorageData & {
    updateOwner: (owner: string) => void;
    updateVerifier: (verifier: string) => void;
    updateStatusBidding: (newStatus: boolean) => void;
    updateBidHashes: (hash: number) => void;
    updateDataList: (dataList: Array<TDataList>) => void;
    reset: () => void;
  }
>()((set) => ({
  ...initialValues,
  updateDataList: (dataList) =>
    set((state) => {
      const oldData = keyBy(dataList, "key");
      return {
        ...state,
        dataList: dataList.map((data) => {
          const _oldData = oldData ? { ...oldData[data.key] } : {};
          return { ...data, ..._oldData };
        }),
      };
    }),
  reset: () => set(() => ({ ...initialValues })),
  updateBidHashes: (hash) => set((state) => ({ ...state, bidHashes: hash })),
  updateOwner: (owner) => set((state) => ({ ...state, owner })),
  updateVerifier: (verifier) => set((state) => ({ ...state, verifier })),
  updateStatusBidding: (newStatus) =>
    set((state) => ({ ...state, biddingOpen: newStatus })),
}));
