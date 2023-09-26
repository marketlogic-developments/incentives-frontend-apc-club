import React, { useState } from "react";
import { Checkbox, MultiSelect, Text } from "@mantine/core";
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
  data = ["React", "Angular", "Vue", "Svelte"],
  onChange,
  searchable = false,
  name,
  disabled = false,
}) => {
  const [selectedValues, setSelectedValues] = useState(value);

  const handleMultiSelectChange = (values) => {
    try {
      // No elimines las opciones seleccionadas del listado de datos
      setSelectedValues(values);
      onChange(name, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MultiSelect
      className={`${styles}`}
      label={label}
      placeholder={placeholder}
      itemComponent={MultiSelectItem}
      rightSection={icon}
      searchable={searchable}
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
      onChange={handleMultiSelectChange}
    />
  );
};

export default MultiSelectInput;
