import Head from "next/head";
import React from "react";

const ContainerContent = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main
        className="px-8 pt-10 relative"
        style={{ marginTop: "5vh" }}
      >
        <div className="gap-10 flex flex-col h-full">{children}</div>
      </main>
    </>
  );
};

export default ContainerContent;
