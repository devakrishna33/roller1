import React from "react";
import { Menu, Icon, Layout } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default () => {
  const handleClick = (e: any) => {
    console.log("click ", e);
  };

  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        onClick={handleClick}
        style={{ width: 256, minHeight: "94vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="project" />
              <span>Projects</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <Icon type="folder-add" />
            New Project
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="appstore" />
            All Projects
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="hdd" />
            Archived Projects
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
