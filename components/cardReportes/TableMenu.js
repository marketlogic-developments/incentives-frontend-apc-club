import React from "react";
import { ArrowDown } from "../icons";
import { Menu, Button, Text } from "@mantine/core";

const TableMenu = ({ icon = <ArrowDown />, title = "title", children }) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button color="gray">{icon}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item color="black">
          <a className="text-black">Settings</a>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TableMenu;
