import React from "react";
import { PageFix } from "../../icons";
import Maintenance from "../../maintenance/Maintenance";

const Eventos = () => {
  return (
    <div>
      <Maintenance icon={<PageFix />} title={"Eventos"} />
    </div>
  );
};

export default Eventos;
