import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MenuAPC = ({ icon, page, text, index, subsections, href, location }) => {
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (subsections !== undefined) {
      const pages = subsections.map(({ page }) => page);

      !pages.includes(location) && setDrop(false);
    }
  }, [location]);

  return (
    <div>
      <div className="containerItemLayout px-6" key={index}>
        <div
          className={
            window.location.pathname === page
              ? "itemLayoutSelect"
              : "itemLayout"
          }
          key={index}
          onClick={() => {
            if (subsections) {
              const pages = subsections.map(({ page }) => page);

              if (pages.includes(location)) {
                return;
              }

              return setDrop(!drop);
            }

            href(page);
          }}
        >
          {icon}
          <p className="whitespace-nowrap">{text}</p>
        </div>
      </div>
      {subsections !== undefined && drop && (
        <div className="flex flex-col bg-[#E0E0E0] px-6 py-[8px] gap-[8px]">
          {subsections.map(({ icon, page, text }, index) => (
            <div className="containerItemLayout" key={index}>
              <div
                className={
                  window.location.pathname === page
                    ? "itemLayoutSelect"
                    : "itemLayout"
                }
                key={index}
                onClick={() => href(page)}
              >
                {icon}
                <p className="whitespace-nowrap">{text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuAPC;
