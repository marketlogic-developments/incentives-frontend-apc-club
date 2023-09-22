import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../store/reducers/users.reducer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Video } from "cloudinary-react";

const ModalPersonalize = ({ onClose }) => {
  const video = useSelector((state) => state.contentful.videos[0]);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

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
    <div className="w-screen h-screen animationVideo">
      <ReactPlayer
        url={i18n.resolvedLanguage === "por" ? video.linkUrlPor : video.linkUrl}
        controls
        playing={true}
        width={"100%"}
        height={"100%"}
        muted
        onEnded={handleVideo}
        loop={false}
      />
    </div>
  );
};

export default ModalPersonalize;
