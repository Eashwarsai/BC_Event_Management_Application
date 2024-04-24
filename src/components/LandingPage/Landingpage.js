import React, { useContext } from "react";
import { Layout, Menu, theme } from "antd";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { NavIcons, SliderFeilds } from "../../constants/Constants";
import { LogoutOutlined } from "@ant-design/icons";
import UserContext from "../../context/UserContext";
import "./LandingPage.css";
import AllRoutes from "../AllRoutes";
const { Header, Content, Footer, Sider } = Layout;

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname.split("/").slice(-1)[0];
  console.log(currentLocation);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items1 = NavIcons.map((key) => ({
    key: key,
    label: key,
    onClick: () => {
      navigate(`/Home/${key}`);
    },
  }));
  const items2 = SliderFeilds.map(({ icon, key }) => {
    if (key === "Admin" && !currentUser.is_admin) return "";
    return {
      key: key,
      icon: React.createElement(icon),
      label: key,
      onClick: () => {
        navigate(`/${key}`);
      },
    };
  });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <h1> BeautifulCode </h1>
        {location.pathname.indexOf("/Home") !== -1 ? (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentLocation]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
              margin: "0 1rem",
            }}
          />
        ) : (
          ""
        )}
        <div
          style={{
            color: "white",
            marginRight: 0,
            marginLeft: "auto",
            cursor: "pointer",
          }}
          onClick={() => setCurrentUser(null)}
        >
          <LogoutOutlined /> Logout
        </div>
      </Header>
      <Content
        style={{
          margin: "2rem 0",
          padding: "0 3rem",
          backgroundColor: "aliceblue",
        }}
      >
        <Layout
          style={{
            minHeight: "78vh",
            background: colorBgContainer,
            borderRadius: "0.5rem",
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={
                location.pathname.indexOf("/Home") !== -1
                  ? ["Home"]
                  : [currentLocation]
              }
              style={{
                minHeight: "100%",
                padding: "24px 0",
                borderRadius: borderRadiusLG,
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "24px",
              minHeight: "100%",
            }}
          >
            <AllRoutes/>
          </Content>
        </Layout>
      </Content>
      <Footer className="footer">
        Design ©{new Date().getFullYear()} Created by Eashwarsai
      </Footer>
    </Layout>
  );
};
export default LandingPage;
