import React from "react";

const dashboard = () => {
  return <div>aaaa</div>;
};

export default dashboard;

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3, 4, 5],
    },
  };
}
