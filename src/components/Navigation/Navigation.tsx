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
      <Menu.Item key="alert" onClick={() => push(ROUTES.TRENDING)}>
        <Icon type="alert" />
        Trending
      </Menu.Item>
      <Menu.Item key="fire" onClick={() => push(ROUTES.HEAT_MAP)}>
        <Icon type="fire" />
        Heat Map
      </Menu.Item>
    </Menu>
  );
};
