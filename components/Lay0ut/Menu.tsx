import { DefaultTFuncReturn } from "i18next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
  icon: JSX.Element;
  page: string;
  text: DefaultTFuncReturn;
  index: number;
  subsections?: Props[];
  href: Function;
  location: string;
  collapse: boolean;
  link: string;
}

const MenuAPC: FC<Props> = ({
  icon,
  page,
  text,
  index,
  subsections,
  href,
  location,
  collapse,
  link,
}) => {
  const [drop, setDrop] = useState(false);
  const route = useRouter();
  const thislocation = route.pathname;

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

  if (link) {
    return (
      <div className={collapse ? "flex" : undefined}>
        <div
          className="containerItemLayout px-6 w-full"
          key={index}
          style={{ ["--wicons" as string]: collapse ? "100%" : "10.4%" }}
        >
          <a
            href={link}
            className={`itemLayout ${collapse && "justify-center"}`}
          >
            {icon}
            {!collapse && <p className={`whitespace-nowrap`}>{text}</p>}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={collapse ? "flex" : undefined}>
      <div
        className="containerItemLayout px-6 w-full"
        key={index}
        style={{ ["--wicons" as string]: collapse ? "100%" : "10.4%" }}
      >
        <div
          className={`${
            thislocation === page && subsections === undefined
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
                  thislocation === page ? "itemLayoutSelect" : "itemLayout"
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
                <p className="whitespace-nowrap ml-10 !text-[12px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuAPC;
