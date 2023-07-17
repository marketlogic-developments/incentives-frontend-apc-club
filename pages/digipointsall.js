import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import DigipointsAll from "../components/digipoints/DigipointsAll";

const digipoints = () => {
  return (
    <>
      <Head>
        <title>DigiPoints</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main
        className="relative flex justify-center"
        style={{ marginTop: "5vh" }}
      >
        <div className="gap-10 flex flex-col h-full w-full">
          <div class="flex flex-col gap-16">
            <DigipointsAll />
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 3, 5],
    },
  };
}

export default digipoints;
