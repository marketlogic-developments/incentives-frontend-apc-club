import React from "react";
import { Select, Group, Text } from "@mantine/core";
import { ArrowDown } from "../icons";

/**
 * Complemento para mostrar los iconos dentro de los campos label
 * @param {*} param0
 * @returns
 */
const SelectItem = ({ image, label, description, ...others }) => (
  <div {...others}>
    <Group noWrap>
      {image ? image : ""}
      <div>
        <Text size="sm">{label}</Text>
      </div>
    </Group>
  </div>
);

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
  data = [],
  bgColorDataSelected = "#FFEEED",
  colorDataSelected = "#EB1000",
  borderRadiusDataSelected = "30px",
  bgColorDataHover = "#FFEEED",
  colorDataHover = "#EB1000",
  borderRadiusDataHover = "30px",
  onChange,
  name,
  value = "",
  disabled = false,
}) => {
  return (
    <Select
      className={`${styles}`}
      label={label}
      value={value}
      placeholder={placeholder}
      itemComponent={SelectItem}
      rightSection={icon}
      data={data}
      radius="md"
      disabled={disabled}
      size="md"
      transitionProps={{
        transition: "pop-top-left",
        duration: 80,
        timingFunction: "ease",
      }}
      variant="filled"
      withinPortal
      clearable
      styles={() => ({
        item: {
          // applies styles to selected item
          "&[data-selected]": {
            "&, &:hover": {
              backgroundColor: bgColorDataSelected,
              color: colorDataSelected,
              borderRadius: borderRadiusDataSelected,
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          "&[data-hovered]": {
            backgroundColor: bgColorDataHover,
            color: colorDataHover,
            borderRadius: borderRadiusDataHover,
          },
        },
      })}
      onChange={(info) => onChange(name, info)}
    />
  );
};

export default SelectInput;
