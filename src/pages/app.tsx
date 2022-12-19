import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Col, Layout, Row, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useLayoutEffect } from "react";
import { useAccount } from "wagmi";
import AppFormBid from "../components/Form/AppFormBid";

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { address } = useAccount();

  if (!address) return null;

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
            <AppFormBid />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default App;
