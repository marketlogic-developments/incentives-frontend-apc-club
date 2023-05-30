import Head from "next/head";
import React from "react";

const ContainerContent = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      {children}
    </>
  );
};

export default ContainerContent;
