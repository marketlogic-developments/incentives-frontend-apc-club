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
  icon = <ArrowDown />,
  placeholder = "Pick one",
  label = "Write here",
  data = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
  ],
}) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      rightSection={icon}
      data={data}
    />
  );
};

export default SelectInput;
