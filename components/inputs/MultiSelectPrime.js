import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

export default function MultiSelectInput({
  placeholder,
  value,
  data,
  icon,
  searchable,
  onChange,
  name,
  selectionLimit,
}) {
  const [selectedItems, setSelectedItems] = useState(value);

  const handleOnChange = (e) => {
    setSelectedItems(e.value);
    if (onChange) {
      onChange(name, e.value);
    }
  };

  return (
    <MultiSelect
      value={value}
      onChange={handleOnChange}
      options={data}
      optionLabel="label"
      showClear={true}
      selectionLimit={selectionLimit}
      filter={searchable}
      placeholder={placeholder}
      maxSelectedLabels={3}
      className="w-full md:w-20rem bg-[#F1F3F5] h-10 border-none"
      virtualScrollerOptions={{ itemSize: 23 }}
      dropdownIcon={icon}
      itemClassName="!text-black hover:!text-red-500 hover:!bg-red-100 !rounded-full custom-multiselect-token custom-multiselect-option .p-multiselect-filter .p-checkbox-box"
    />
  );
}
