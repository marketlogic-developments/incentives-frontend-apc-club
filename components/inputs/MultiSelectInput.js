import React from "react";
import { MultiSelect, Text } from "@mantine/core";
import { ArrowDown } from "../icons";

/**
 * Complemento para mostrar los iconos dentro de los campos label
 * @param {*} param0
 * @returns
 */
const MultiSelectItem = ({ label, ...others }) => (
  <div {...others}>
    <div>
      <Text size="sm">{label}</Text>
    </div>
  </div>
);

/**
 * Componente adaptado para MultiSelect
 * @param {*} param0
 * @returns
 */
const MultiSelectInput = ({
  styles = "",
  icon = <ArrowDown />,
  value = [],
  placeholder = "Pick value",
  label = "",
  data = ['React', 'Angular', 'Vue', 'Svelte'],
  onChange,
  name,
  disabled = false,
}) => {
  return (
    <MultiSelect
      className={`${styles}`}
      label={label}
      placeholder={placeholder}
      itemComponent={MultiSelectItem}
      rightSection={icon}
      value={value}
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
      clearable
      disabled={disabled}
      onChange={(values) => onChange(name, values)}
    />
  );
};

export default MultiSelectInput;
