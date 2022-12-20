import { Button, Empty, Modal, Skeleton, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAccount } from "wagmi";
import AppFormReveal from "../components/Form/AppFormReveal";
import { useToggle } from "../hooks/useToggle";
import { useStorageData } from "../store/useStorageData";
import { useContractZkBid } from "../web3/useContract";
import { useGetPlayers } from "../web3/useGetListPlayer";

const AppListPlayer = () => {
  /* 
    1. GET totalUsersBidding
    2. GET getUserByIndex -> address user
    3. CHECK user bid bidHashes[user] --yes-> bidHash ---no-> bidHash = bid(bidValue);
    4. CHECK user have reveal bidValues[user] -> bidValue ---no-> revealBid(proofBid, bidValue);
  */

  const { isConnected } = useAccount();

  if (!isConnected) return <div>please connect wallet</div>;

  return <DashBoardContent />;
};

interface DataType {
  key: string;
  address: string | unknown;
  bidHash: string | number | unknown;
  bidValue: string | number | unknown;
  tags: string[];
}

const DashBoardContent = () => {
  const [open, onToggle] = useToggle(false);

  const { loading } = useGetPlayers();
  const { dataList } = useStorageData();

  const contractInstance = useContractZkBid();

  const handleReveal = async (address: string) => {};

  const handleCancel = () => {
    onToggle();
  };

  const handleOk = async () => {
    // const tx = await zkBidInstance?.bid(dataBid.proofBid, dataBid.hash);
    // toast.promise(tx.wait().finally(onToggle), {
    //   loading: "Loading",
    //   success: "Got the data",
    //   error: "Error when fetching",
    // });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (stt) => <small>{stt}</small>,
    },

    {
      title: "Bid Hash",
      dataIndex: "bidHash",
      key: "bid hash",
      render: (value) => <small>{JSON.stringify(value)}</small>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "Not Ready") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Bid Value",
      dataIndex: "bidValue",
      key: "bid value",
      render: (value) => {
        return (
          <small>
            {!!+value ? (
              +value
            ) : (
              <Button type="primary" onClick={onToggle}>
                Reveal
              </Button>
            )}
          </small>
        );
      },
    },
  ];

  if (!dataList) return null;

  return (
    <>
      <Typography>
        <Typography.Title>Players</Typography.Title>
      </Typography>
      <Table
        columns={columns}
        dataSource={dataList.length > 0 ? dataList : []}
        locale={{
          emptyText: loading ? <Skeleton active={true} /> : <Empty />,
        }}
      />

      <Modal
        className="modalStyle"
        title=""
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AppFormReveal />
      </Modal>
    </>
  );
};
export default AppListPlayer;
