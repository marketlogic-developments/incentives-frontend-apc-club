import React from "react";
import { SearchIcon } from "../icons";

const SearchInput = ({
  image = <SearchIcon />,
  placeHolder = "...",
  stylesContainer = "",
  stylesInput = "",
  stylesImage = "",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className={`relative ${stylesContainer}`}>
      <div className="absolute inset-y-0 left-3">
        <div className={`flex items-center h-full ${stylesImage}`}>{image}</div>
      </div>
      <input
        type="text"
        placeholder={placeHolder}
        className={`input h-8 bg-base-200/50 ${stylesInput}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
