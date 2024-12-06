import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MenuAPC = ({
  icon,
  page,
  text,
  index,
  subsections,
  href,
  location,
  collapse,
  dataUserSwitch,
}) => {
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (!collapse) {
      if (subsections !== undefined) {
        const pages = subsections.map(({ page }) => page);

        !pages.includes(location) ? setDrop(false) : setDrop(true);
      }
    } else {
      if (subsections !== undefined) {
        const pages = subsections.map(({ page }) => page);

        !pages.includes(location) && setDrop(false);
      }
    }
  }, [location]);

  return (
    <div className={collapse && "flex"}>
      <div
        className="containerItemLayout px-6 w-full"
        key={index}
        style={{ "--wicons": collapse ? "100%" : "10.4%" }}
      >
        <div
          className={`${
            window.location.pathname === page && subsections === undefined
              ? "itemLayoutSelect"
              : "itemLayout"
          } ${collapse && "justify-center"}`}
          key={index}
          onClick={() => {
            if (subsections !== undefined) {
              const pages = subsections.map(({ page }) => page);

              if (collapse) {
                return setDrop(!drop);
              }

              if (pages.includes(location)) {
                return;
              }

              return setDrop(!drop);
            }

            href(page);
          }}
        >
          {icon}
          {!collapse && <p className={`whitespace-nowrap`}>{text}</p>}
        </div>
      </div>
      {subsections !== undefined && drop && (
        <div
          className={`flex flex-col bg-[#E0E0E0] px-6 py-[8px] gap-[8px] subsection rounded-[10px] ${
            collapse && "absolute left-[90px] mt-[-100%]"
          }`}
        >
          {subsections.map(({ icon, page, text }, index) => (
            <div className="containerItemLayout" key={index}>
              <div
                className={
                  window.location.pathname === page
                    ? "itemLayoutSelect"
                    : "itemLayout"
                }
                key={index}
                onClick={() => {
                  if (collapse) {
                    setDrop(false);
                  }

                  href(page);
                }}
              >
                {!collapse && icon}
                <p className="whitespace-nowrap !text-[12px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuAPC;
