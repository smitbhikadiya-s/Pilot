import React, { useState } from 'react';
import {
  BarChartOutlined,
  BarsOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { theme } from 'antd';
import ImageAtom from '../atoms/image';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { type ItemType, type MenuItemType } from 'antd/es/menu/interface';
import { useAppSelector } from '../../store';
import ButtonAtom from '../atoms/button';
import FlexAtom from '../atoms/flex';
import LayoutAtom from '../atoms/layout';
import MenuAtom, { MenuAtomProps } from '../atoms/menu';
import DropdownAtom from '../atoms/dropdown';

import simrestro from '../../assets/simrestro.png';
import '../../styles/adminlayout.css';

const { Header, Sider, Content } = LayoutAtom;

enum MenuItemKey {
  Dashboard = '/',
  Menu = '/menu',
}

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { pathname } = useLocation();

  const MenuItems: ItemType<MenuItemType>[] = [
    {
      key: MenuItemKey.Dashboard,
      icon: <BarChartOutlined />,
      label: <Link to={'/'}>Dashboard</Link>,
    },
    {
      key: MenuItemKey.Menu,
      icon: <BarsOutlined />,
      label: <Link to={'/menu'}>Menu</Link>,
    },
  ];

  const items: MenuAtomProps['items'] = [
    {
      key: '2',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => navigate('/logout'),
    },
  ];

  const defaultSelectedKeys = pathname || MenuItemKey.Dashboard;

  return (
    <LayoutAtom className="dashboard-layout-wrapper">
      {/* SIDEBAR */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        breakpoint="md"
        onBreakpoint={broken => {
          setIsMobile(broken);
          setCollapsed(broken);
        }}
        style={{
          height: '100%',
          zIndex: 1000,
          position: 'fixed',
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
            left: collapsed ? '18px' : '218px',
          }}
          className="dashboard-sidebar-toggler-button"
        />
        <ImageAtom
          src={simrestro}
          className="dashboard-sidebar-top-image"
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
        }}
        className="dashboard-content-layout-wrapper"
      >
        {/* HEADER */}
        <Header
          style={{ background: colorBgContainer }}
          className="dashboard-header"
        >
          <FlexAtom
            justify="end"
            align="center"
            className="dashboard-header-wrapper"
          >
            <FlexAtom gap={4} align="center">
              <DropdownAtom menu={{ items }}>
                <a onClick={e => e.preventDefault()}>
                  <FlexAtom
                    gap={4}
                    style={{ cursor: 'pointer' }}
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

        {/* CONTENT */}
        <Content
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="dashboard-content"
        >
          <Outlet />
        </Content>
      </LayoutAtom>
    </LayoutAtom>
  );
};

export default AdminLayout;
