import { useRef, useEffect, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import { useTranslation } from "react-i18next";

export function SignModal({ setOpened, setImageSign, setChecked }) {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [sign, setSign] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      // Configurar el estilo del trazo
      context.strokeStyle = "#000000";
      context.lineWidth = 2;

      // Función para dibujar cuando el usuario arrastra el ratón
      function draw(event) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
      }

      // Agregar event listeners al canvas para detectar los eventos de ratón
      canvas.addEventListener("mousedown", (event) => {
        context.beginPath();
        context.moveTo(event.offsetX, event.offsetY);
        canvas.addEventListener("mousemove", draw);
      });

      canvas.addEventListener("mouseup", () => {
        canvas.removeEventListener("mousemove", draw);
      });

      // Limpiar el canvas al iniciar
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [sign]);

  function handleClearClick() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function handleCaptureClick() {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setImageData(image);
  }

  function captureInput() {
    if (inputRef.current === null) {
      return;
    }

    toPng(inputRef.current, { cacheBust: true })
      .then((dataUrl) => {
        setImageData(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClick = () => {
    if (sign === 0) {
      return captureInput();
    }

    handleCaptureClick();
  };

  useEffect(() => {
    if (imageData !== null) {
      setImageSign(imageData);
      setImageData(null);
      setOpened(false);
    }
  }, [imageData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full justify-center gap-10">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setSign(0)}
        >
          <svg
            width="30"
            height="30"
            fill={sign === 0 ? "#1e40af" : "#6e6e6e"}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.953 4.453H3.047a1.594 1.594 0 0 0-1.594 1.594v11.906a1.594 1.594 0 0 0 1.594 1.594h17.906a1.594 1.594 0 0 0 1.594-1.594V6.047a1.594 1.594 0 0 0-1.594-1.594ZM6 15.75h-.75a.75.75 0 1 1 0-1.5H6a.75.75 0 1 1 0 1.5Zm9 0H9a.75.75 0 1 1 0-1.5h6a.75.75 0 1 1 0 1.5Zm3.75 0H18a.75.75 0 1 1 0-1.5h.75a.75.75 0 1 1 0 1.5Zm0-3H5.25a.75.75 0 1 1 0-1.5h13.5a.75.75 0 1 1 0 1.5Zm0-3H5.25a.75.75 0 0 1 0-1.5h13.5a.75.75 0 1 1 0 1.5Z"></path>
          </svg>
          <p>Teclea</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setSign(1)}
        >
          <svg
            width="39"
            height="30"
            fill="none"
            stroke={sign === 1 ? "#1e40af" : "#6e6e6e"}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 20.252H4.5a.75.75 0 0 1-.75-.75v-4.19a.74.74 0 0 1 .216-.526l11.25-11.25a.75.75 0 0 1 1.068 0l4.182 4.181a.75.75 0 0 1 0 1.07L9 20.251Z"></path>
            <path d="M12.75 6 18 11.25"></path>
            <path d="M4.125 14.625 9.75 20.25"></path>
            <path d="M20.25 20.25H9"></path>
            <path d="M15.375 8.625 6.75 17.25"></path>
          </svg>
          <p>Dibuja</p>
        </div>
      </div>
      <div className="border-2">
        <div className="flex w-full relative border-b-2 border-blue-800">
          {sign !== 0 ? (
            <canvas
              ref={canvasRef}
              width={480}
              height={120}
              className="absolute max-sm:relative max-sm:w-full top inset-0 m-auto"
            />
          ) : (
            <div className="absolute top inset-0 m-auto h-[80px] w-[380px]">
              <div className="relative w-full h-full ">
                <input
                  className="w-full h-full focus:outline-none text-3xl text-center inputSign"
                  type="text"
                  ref={inputRef}
                />
              </div>
            </div>
          )}
          <figure className="ml-5 max-sm:hidden">
            <img src="assets/Icons/adobeS.png" alt="adobe-sign"></img>
          </figure>
        </div>
        <div className="h-[70px] flex justify-end items-center px-5">
          {sign === 1 && (
            <p
              onClick={handleClearClick}
              className="text-secondary cursor-pointer"
            >
              {t("tyc.borrar")}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-evenly">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setChecked(false);
            setOpened(false);
          }}
        >
          Cancelar
        </button>
        <button className="btn btn-secondary" onClick={handleClick}>
          Aplicar
        </button>
      </div>
    </div>
  );
}
