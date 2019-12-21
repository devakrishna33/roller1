import React from "react";
import { Menu, Icon } from "antd";
import Navigation from "../Navigation";

const { SubMenu } = Menu;

export default () => {
  const handleClick = (e: any) => {
    console.log("click ", e);
  };

  return <Navigation />;
};
