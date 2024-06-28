import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import DigipointsAll from "../../components/digipoints/DigipointsAll";

const digipoints = () => {
  return (
    <>
      <Head>
        <title>DigiPoints</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <DigipointsAll />
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
