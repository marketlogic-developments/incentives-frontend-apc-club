import Head from "next/head";
import React from "react";

const ContainerContent = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main
        className="relative flex justify-center"
        style={{ marginTop: "5vh" }}
      >
        <div className="gap-10 flex flex-col h-full w-5/6">{children}</div>
      </main>
    </>
  );
};

export default ContainerContent;
