import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../store/reducers/currentUser.reducer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Video } from "cloudinary-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const ModalInfoAPC = ({ onClose }) => {
  const video = useSelector((state) => state.contentful.videos[0]);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const typeText = i18n.language === "por" ? video.textPor : video.text;

  const handleVideo = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
        {
          cpf: video.key,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch(userUpdate({ cpf: video.key }));
      })
      .catch((e) => console.log(e))
      .finally(() => {
        onClose(false);
      });
  };

  return (
    <div className="w-full h-full flex-col flex justify-center items-center gap-6">
      <div className="w-1/2 flex flex-col justify-center items-center pt-20 text-center gap-6">
        {documentToReactComponents(typeText)}
      </div>
      <div className="p-6">
        <button className="btn btn-primary" onClick={handleVideo}>
          {t("tabla.continuar")}
        </button>
      </div>
    </div>
  );
};

export default ModalInfoAPC;
