import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardProduct from "./CardProduct";
import { Stepper, StepperProps, rem } from "@mantine/core";

function StyledStepper(props) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: "none",
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          borderWidth: rem(4),
        },

        separator: {
          marginLeft: rem(-2),
          marginRight: rem(-2),
          height: rem(10),
        },
      }}
      {...props}
    />
  );
}

const ModalProducts = ({ data }) => {
  const [t, i18n] = useTranslation("global");
  const [active, setActive] = useState(1);
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  useEffect(() => {
    if (Number(data.operationStatusId) === 13) {
      setState1(true);
      return;
    }
    if (Number(data.operationStatusId) === 14) {
      setState1(true);
      setState2(true);
      return;
    }
    if (Number(data.operationStatusId) === 15) {
      setState1(true);
      setState2(true);
      setState3(true);
      return;
    }
    if (Number(data.operationStatusId) === 16) {
      setState1(true);
      setState2(true);
      setState3(true);
      setState4(true);
      return;
    }
  });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-bold text-base py-5">
          {t("estadoProducto.seguimiento")}
        </p>
        <div className="w-full flex h-full flex-col">
          <div className="w-full flex justify-between">
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.40039 9.10147V23.7917C5.40221 24.3999 5.64462 24.9827 6.07469 25.4128C6.50476 25.8428 7.08754 26.0852 7.69574 26.0871H23.3041C23.9123 26.0852 24.4951 25.8428 24.9252 25.4128C25.3552 24.9827 25.5977 24.3999 25.5995 23.7917V9.10147"
                stroke="#1473E6"
                stroke-width="1.83628"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.8289 4.0517H5.17071C4.28333 4.0517 3.56396 4.77106 3.56396 5.65844V7.03565C3.56396 7.92303 4.28333 8.6424 5.17071 8.6424H25.8289C26.7162 8.6424 27.4356 7.92303 27.4356 7.03565V5.65844C27.4356 4.77106 26.7162 4.0517 25.8289 4.0517Z"
                stroke="#1473E6"
                stroke-width="1.83628"
                stroke-linejoin="round"
              />
              <path
                d="M19.1723 17.8238L15.4997 21.4964L11.8271 17.8238M15.4997 20.2276V13.2331"
                stroke="#1473E6"
                stroke-width="1.83628"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="23"
              height="26"
              viewBox="0 0 23 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2814 8.568V6.82837C6.2814 5.44423 6.83125 4.11678 7.80998 3.13805C8.78872 2.15931 10.1162 1.60947 11.5003 1.60947C12.8844 1.60947 14.2119 2.15931 15.1906 3.13805C16.1694 4.11678 16.7192 5.44423 16.7192 6.82837V8.568M1.93232 8.568C1.70163 8.568 1.48039 8.65964 1.31726 8.82277C1.15414 8.98589 1.0625 9.20713 1.0625 9.43782V21.1804C1.0625 22.8243 2.46291 24.2247 4.10686 24.2247H18.8938C20.5377 24.2247 21.9381 22.8923 21.9381 21.2483V9.43782C21.9381 9.20713 21.8465 8.98589 21.6833 8.82277C21.5202 8.65964 21.299 8.568 21.0683 8.568H1.93232Z"
                stroke="#BABABA"
                stroke-width="1.73963"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.2638 5.2189H5.73723C4.05588 5.2189 2.69287 6.58191 2.69287 8.26326V19.5709C2.69287 21.2522 4.05588 22.6152 5.73723 22.6152H22.2638C23.9451 22.6152 25.3081 21.2522 25.3081 19.5709V8.26326C25.3081 6.58191 23.9451 5.2189 22.2638 5.2189Z"
                stroke="#BABABA"
                stroke-width="1.73963"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.69287 10.4378H25.3081M7.04196 16.3091H9.65141V17.3963H7.04196V16.3091Z"
                stroke="#BABABA"
                stroke-width="3.26181"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_654_8229)">
                <path
                  d="M25.6498 14.7407L2.42896 24.3174C2.36445 24.3477 2.29335 24.3614 2.2222 24.357C2.15104 24.3527 2.08211 24.3306 2.02172 24.2928C1.96133 24.2549 1.91143 24.2024 1.87658 24.1403C1.84173 24.0781 1.82305 24.0081 1.82227 23.9369V17.7769C1.82227 17.6756 1.85762 17.5775 1.92223 17.4995C1.98684 17.4215 2.07665 17.3685 2.17617 17.3496L15.6377 14.7945C16.5814 14.6157 16.5814 13.2642 15.6377 13.0853L2.17563 10.5303C2.0763 10.5113 1.98669 10.4583 1.9222 10.3804C1.8577 10.3025 1.82237 10.2046 1.82227 10.1035V3.94629C1.82227 3.63424 2.14192 3.38852 2.42896 3.51138L25.6498 13.143C25.8059 13.2102 25.9389 13.3217 26.0323 13.4637C26.1258 13.6056 26.1756 13.7719 26.1756 13.9418C26.1756 14.1118 26.1258 14.278 26.0323 14.42C25.9389 14.562 25.8059 14.6735 25.6498 14.7407Z"
                  stroke="#BABABA"
                  stroke-width="1.71547"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_654_8229">
                  <rect
                    width="27.8341"
                    height="27.8341"
                    fill="white"
                    transform="translate(0.0830078)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="w-full">
            <StyledStepper active={active} onStepClick={setActive}>
              <Stepper.Step label="Step 1" description="Create an account" />
              <Stepper.Step label="Step 2" description="Verify email" />
              <Stepper.Step label="Step 3" description="Get full access" />
              <Stepper.Step label="Step 4" description="Get full access" />
            </StyledStepper>
            {/* <div className="col-12 col-md-10 pt45 pb20 h-full flex">

              <div className="flex w-full items-center">
                <div className={`order-tracking ${state1 && "completed"} `}>
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.recibido")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2) && "completed"
                  } `}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.aprobado")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2, state3) && "completed"
                  } `}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.proceso")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2, state3, state4) ? "completed" : null
                  } `}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.enviar")}
                    <br />
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl py-5">{t("redenciones.solicitado")}</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {data.productsObject.map((info, index) => {
          return <CardProduct info={info} index={index} />;
        })}
      </div>
    </div>
  );
};

export default ModalProducts;
