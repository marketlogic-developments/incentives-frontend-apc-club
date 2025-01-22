import React, { FC, ReactElement } from "react";

interface Props{
  title: string,
  paragraph?: string,
  content?: ReactElement,
  children: ReactElement
  hfull?: string,
}

const CardChart: FC<Props> = ({
  title = "",
  paragraph = "",
  content,
  children,
  hfull,
}) => {
  return (
    <div className={`card ${hfull ? hfull : ""} w-full bg-base-100 shadow-md`}>
      <div className="card-body font-bold w-full">
        <div>
          <p className="font-medium">{paragraph}</p>
        </div>
        <div className="flex justify-center ">
          <div className="w-full">
            <div className="grid grid-cols-2">
              <h1 className="xl:!text-xl lg:!text-sm">{title}</h1>
              {content}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardChart;
