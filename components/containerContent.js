import Head from "next/head";
import React from "react";

const ContainerContent = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main className="relative flex justify-center mt-6">
        <div className="gap-10 flex flex-col h-full w-full">{children}</div>
      </main>
    </>
  );
};

export default ContainerContent;
