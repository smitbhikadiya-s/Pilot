import React, { useState } from "react";
import {
  BarChartOutlined,
  BarsOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import ImageAtom from "../atoms/image";
import simrestro from "../../assets/simrestro.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { type ItemType, type MenuItemType } from "antd/es/menu/interface";
import { useAppSelector } from "../../store";
import ButtonAtom from "../atoms/button";
import FlexAtom from "../atoms/flex";
import LayoutAtom from "../atoms/layout";
import MenuAtom, { MenuAtomProps } from "../atoms/menu";
import DropdownAtom from "../atoms/dropdown";

const { Header, Sider, Content } = LayoutAtom;

enum MenuItemKey {
  Dashboard = "/",
  Menu = "/menu",
}

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { pathname } = useLocation();

  const MenuItems: ItemType<MenuItemType>[] = [
    {
      key: MenuItemKey.Dashboard,
      icon: <BarChartOutlined />,
      label: <Link to={"/"}>Dashboard</Link>,
    },
    {
      key: MenuItemKey.Menu,
      icon: <BarsOutlined />,
      label: <Link to={"/menu"}>Menu</Link>,
    },
  ];

  const items: MenuAtomProps["items"] = [
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => navigate("/logout"),
    },
  ];

  const defaultSelectedKeys = pathname || MenuItemKey.Dashboard;

  return (
    <LayoutAtom className="dashboardLayout">
      {/* Repositioned Toggle Button - placed outside the sidebar, top-right of the layout */}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          setCollapsed(broken); // optional: auto-collapse on mobile
        }}
        style={{
          height: "100vh",
          zIndex: 1000,
          position: "fixed", // Keeps it fixed in place
          left: 0,
          top: 0,
        }}
        width={200}
      >
        <ButtonAtom
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "fixed",
            top: 16,
            left: collapsed ? "18px" : "218px",
            zIndex: 1100,
          }}
        />
        <ImageAtom
          src={simrestro}
          style={{ height: 60, padding: "8px 26px" }}
          preview={false}
        />
        <MenuAtom
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          items={MenuItems}
        />
      </Sider>

      <LayoutAtom
        style={{
          marginLeft: !isMobile && !collapsed ? 200 : 0,
          transition: "margin-left 0.2s",
        }}
      >
        {/* HEADER - stays normal as before */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <FlexAtom
            justify="space-between"
            align="center"
            style={{
              padding: "0 24px",
              height: "100%",
            }}
          >
            {/* Optionally keep this space empty, the button is outside */}
            <div />
            <FlexAtom gap={4} align="center">
              <DropdownAtom menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <FlexAtom
                    gap={4}
                    style={{ cursor: "pointer" }}
                    align="center"
                  >
                    {user?.name}
                    <UserOutlined />
                  </FlexAtom>
                </a>
              </DropdownAtom>
            </FlexAtom>
          </FlexAtom>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </LayoutAtom>
    </LayoutAtom>
  );
};

export default AdminLayout;
