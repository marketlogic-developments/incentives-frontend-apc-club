import React, { Component } from "react";
import { Select, Group, Text } from "@mantine/core";
import { ArrowDown } from "../icons";

/**
 * Este componente es generado con la libreria de Mantine, si se desea hacer mas modificaciones al mismo
 * se recomienda ver la documentación de la misma https://mantine.dev/
 * @param {*} param0
 * @returns
 */

const SelectItem = ({ image, label, description, ...others }) => (
  <div {...others}>
    <Group noWrap>
      {image}
      <div>
        <Text size="sm">{label}</Text>
      </div>
    </Group>
  </div>
);

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
      itemComponent={SelectItem}
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
      styles={() => ({
        item: {
          // applies styles to selected item
          "&[data-selected]": {
            "&, &:hover": {
              backgroundColor: "#FFEEED",
              color: "#EB1000",
              borderRadius: "30px",
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          "&[data-hovered]": {
            backgroundColor: "#FFEEED",
            color: "#EB1000",
            borderRadius: "30px",
          },
        },
      })}
    />
  );
};

export default SelectInput;
