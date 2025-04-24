import { Layout, type LayoutProps } from "antd";
import React, { FC } from "react";

interface LayoutAtomPropType extends FC<LayoutProps> {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  Sider: typeof Layout.Sider;
  Footer: typeof Layout.Footer;
  children?: React.ReactNode;
}

const LayoutAtom: LayoutAtomPropType = (props) => {
  return <Layout {...props} />;
};

LayoutAtom.Header = Layout.Header;
LayoutAtom.Content = Layout.Content;
LayoutAtom.Sider = Layout.Sider;
LayoutAtom.Footer = Layout.Footer;

export default LayoutAtom;
