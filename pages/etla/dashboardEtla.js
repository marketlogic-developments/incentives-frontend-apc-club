import React from "react";

const dashboardEtla = () => {
  return <div>aaaa</div>;
};

export default dashboardEtla;

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3, 4, 5],
    },
  };
}
