import React, { Component } from "react";
import { Select } from "@mantine/core";
import { ArrowDown } from "../icons";

/**
 * Este componente es generado con la libreria de Mantine, si se desea hacer mas modificaciones al mismo
 * se recomienda ver la documentación de la misma https://mantine.dev/
 * @param {*} param0
 * @returns
 */
const SelectInput = ({
  styles = "",
  icon = <ArrowDown />,
  placeholder = "Pick one",
  label = "",
  data = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
  ],
}) => {
  return (
    <Select
      className={`${styles}`}
      label={label}
      placeholder={placeholder}
      rightSection={icon}
      data={data}
      radius="md"
      size="md"
      transitionProps={{
        transition: "pop-top-left",
        duration: 80,
        timingFunction: "ease",
      }}
      variant="filled"
      withinPortal
    />
  );
};

export default SelectInput;
