import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../constants";
export default () => {
  const [current, setCurrent] = useState(ROUTES.HOME);
  const { push } = useHistory();

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      }}
    >
      <Menu.Item key="add" onClick={() => push(ROUTES.NEW_PROJECT)}>
        <Icon type="plus" />
        Create Project
      </Menu.Item>
      <Menu.Item key="all" onClick={() => push(ROUTES.ALL_PROJECTS)}>
        <Icon type="database" />
        All Projects
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
};
