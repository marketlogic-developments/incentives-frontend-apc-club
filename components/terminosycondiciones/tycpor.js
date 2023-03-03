import React from "react";
import html from "../../public/mkt/TYCPOR.html";

const Tycpor = () => {
  return (
    <div
      class="c46 doc-content text-justify w-2/4 overflow-y-scroll max-sm:w-11/12 border-2 p-10"
      style={{ height: "50vh" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }}></div>;
    </div>
  );
};

export default Tycpor;
