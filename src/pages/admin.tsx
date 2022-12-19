import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Col, Layout, Row, Spin, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useLayoutEffect } from "react";
import { useAccount } from "wagmi";
import AppButton from "../components/AppButton";
import AppFormBid from "../components/Form/AppFormBid";
import { useBidAction, usePreCheck } from "../web3/useBidAction";

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { address } = useAccount();

  const { onStartBidding, checkBiddingOpen } = useBidAction();
  const { loading: isChecking, owner, isBidding } = usePreCheck();

  if (!address) return null;

  if (isChecking)
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );

  const renderContent = () => {
    if (address == owner) {
      if (!isBidding) {
        return <AppButton method={onStartBidding}>Start Bed</AppButton>;
      } else {
        return <AppButton method={onStartBidding}>End Bed</AppButton>;
      }
    }
  };

  return (
    <>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <Row justify={"space-between"} align="middle">
            <Col span={12}>ZkBid</Col>
            <Col span={12}>
              <ConnectButton />
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: "colorBgContainer",
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default App;
