import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";

const TargetVideo = ({ data, setUrlVideo, setOpen }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="p-6 flex flex-col xl:h-[400px]">
      <div
        className="imgMini flex w-full h-full rounded-t-lg bg-[#f5f5f5] relative overflow-hidden"
        onClick={() => {
          setUrlVideo(data.urlEsp);
          setOpen(true);
        }}
      >
        <div className="absolute w-full h-full flex justify-center items-center cursor-pointer">
          <svg
            width="80"
            height="80"
            fill="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.769 9.769 0 0 0 12 2.25Zm3.412 10.378-4.5 3a.816.816 0 0 1-.412.122.796.796 0 0 1-.356-.084A.75.75 0 0 1 9.75 15V9a.75.75 0 0 1 .394-.666.778.778 0 0 1 .768.038l4.5 3a.75.75 0 0 1 0 1.256Z"></path>
          </svg>
        </div>
        <ReactPlayer
          url={i18n.resolvedLanguage === "por" ? data.urlPor : data.urlEsp}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="p-6 flex flex-col bg-[#f5f5f5] w-full">
        <p className="text-xl font-bold">{data.title}</p>
        <p className="text-sm">{data.description}</p>
      </div>
    </div>
  );
};

export default TargetVideo;
