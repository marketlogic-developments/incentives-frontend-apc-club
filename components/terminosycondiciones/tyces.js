import Head from "next/head";
import React from "react";
import TYC from "../../public/mkt/TYCES.html";

const Tyces = () => {
  return (
    <div
      class="c46 doc-content text-justify w-2/4 overflow-y-scroll max-sm:w-11/12 border-2 p-10"
      style={{ height: "50vh" }}
    >
      <div dangerouslySetInnerHTML={{ __html: TYC }}></div>
    </div>
  );
};

export default Tyces;
