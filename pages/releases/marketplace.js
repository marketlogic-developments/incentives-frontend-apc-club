import React from "react";
import ContainerContent from "../../components/containerContent";

const marketplace = () => {
  return (
    <>
      <ContainerContent pageTitle={"MarketPlace"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">MarketPlace</h1>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export default marketplace;
