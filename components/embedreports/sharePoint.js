import React from "react";

const SharePoint = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<script type='module' src='https://prod-useast-b.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://prod-useast-b.online.tableau.com/t/marketlogic/views/APCCANALESDASHBAORD2/Dashboard1' height='913' toolbar='bottom' style="width:100%;" class="sharePointIframe"></tableau-viz>`,
      }}
    ></div>
  );
};

export default SharePoint;
