import { useRef } from "react";
import TargetVideo from "./TargetVideo";
import { Modal } from "@mantine/core";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

const Videos10 = ({ dataContentfulVideos = [] }) => {
  const [open, setOpen] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const [t, i18n] = useTranslation("global");

  console.log(dataContentfulVideos);

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} size={"70%"} centered>
        <div className="h-[75vh] animationVideo">
          <ReactPlayer
            url={urlVideo}
            controls
            playing={true}
            width={"100%"}
            height={"100%"}
            loop={false}
          />
        </div>
      </Modal>
      <div>
        <div className="grid justify-items-center items-center pt-8 pb-8">
          <h2 className="font-bold text-4xl text-center">
            {t("comunicado.titleVideos1")}: <br />{" "}
            {t("comunicado.titleVideos2")}{" "}
            <span className="text-red-600">APC CLUB</span>
          </h2>
          <div className="grid lg:grid-cols-3 w-full pt-6">
            {dataContentfulVideos
              .sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
              })
              .filter((data) =>
                i18n.resolvedLanguage === "por"
                  ? data.urlEsp
                  : i18n.resolvedLanguage === "en"
                  ? data.urlEn
                  : data.urlEsp
              )
              .map((data) => (
                <TargetVideo
                  data={data}
                  setUrlVideo={setUrlVideo}
                  setOpen={setOpen}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos10;
