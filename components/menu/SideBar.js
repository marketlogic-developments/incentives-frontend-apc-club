import React from "react";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Layout from "../Layout";

const SideBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close} size={"xs"} title="">
        <Layout />
      </Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </>
  );
};

export default SideBar;
