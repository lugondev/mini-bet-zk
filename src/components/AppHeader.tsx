import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

const AppHeader = () => {
  return (
    <div
      style={{
        padding: "0 24px",
        color: "#fff",
      }}
    >
      <Row align="middle" justify={"space-between"}>
        <Col md={24} lg={12}>
          <Row
            align="middle"
            style={{
              gap: 20,
            }}
          >
            <Col>
              <Image
                src="/assets/img/logo.svg"
                alt=""
                width={120}
                height={120}
              />
            </Col>
            {/* <Col
              style={{
                color: "#fff",
              }}
            >
              {[
                {
                  name: "Home",
                  href: "/",
                },
                {
                  name: "Dashboard",
                  href: "/dashboard",
                },
              ].map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: 16,
                      paddingRight: 10,
                      color: "#fff",
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </Col> */}
          </Row>
        </Col>

        <Col>
          <ConnectButton />
        </Col>
      </Row>
    </div>
  );
};
export default AppHeader;
