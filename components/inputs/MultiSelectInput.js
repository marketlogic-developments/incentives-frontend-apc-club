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
 *
 * @param {*} param0
 * @returns
 */
const MultiSelectCheckBoxItem = ({ label, selected, onChange, ...others }) => {
  const [isChecked, setIsChecked] = useState(selected);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(label, !isChecked); // Llama a la función onChange con la etiqueta y el nuevo estado del checkbox
  };

  return (
    <div {...others}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ marginRight: 8 }}
        />
        <Text size="sm">{label}</Text>
      </div>
    </div>
  );
};

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
  itemComponent = "MSI",
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
      itemComponent={
        itemComponent === "MSI" ? MultiSelectItem : MultiSelectCheckBoxItem
      }
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
