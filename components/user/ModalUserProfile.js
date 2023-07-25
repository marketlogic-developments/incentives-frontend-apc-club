import React, { useRef, useState } from "react";
import NoImageProfile from "./perfil/NoImageProfile";
import ImageProfile from "./perfil/ImageProfile";
import ButtonBgOut from "../buttons/ButtonBgOut";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { alert } from "../alert/Alert";
import axios from "axios";
import { userUpdate } from "../../store/reducers/users.reducer";
import { useDispatch } from "react-redux";

const ModalUserProfile = ({ user, closeModal, token }) => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [viewimage, setviewImage] = useState("");
  const route = useRouter();
  const fileInputRef = useRef(null);

  const openFileInput = (event) => {
    event.stopPropagation();
    fileInputRef.current.click();
  };

  const deleteProfileImage = () => {
    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
        {
          profilePhotoPath: "noImage",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch(userUpdate({ profilePhotoPath: "noImage" }));
        closeModal();
        alert({
          icon: "success",
          position: "top",
          title: t("user.fotoDelete"),
          width: "100%",
        });
      });
  };

  const handleImgProfile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (e) => {
      const dataURL = e.target.result;
      setviewImage({ path: dataURL });
    };

    reader.readAsDataURL(file);
    setImage(file);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "ADOBEAPC");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        form
      )
      .then((res) => {
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
            { profilePhotoPath: res.data.url },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res2) => {
            dispatch(userUpdate({ profilePhotoPath: res.data.url }));
            alert({
              icon: "success",
              position: "top",
              title: t("user.fotoUpdate"),
              width: "100%",
            });
            closeModal();
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="grid grid-rows-9 mr-8 ml-8 mb-3 mt-3">
        <div className="flex justify-center pb-2">
          {user.profilePhotoPath === null ||
          user.profilePhotoPath === "" ||
          user.profilePhotoPath === "noImage" ? (
            <NoImageProfile
              name={user.names.split("")[0]}
              onClick={openFileInput}
            />
          ) : (
            <ImageProfile
              profilePhoto={user.profilePhotoPath}
              onClick={deleteProfileImage}
            />
          )}
        </div>
        <div className="grid justify-items-center mb-3">
          <div className="text-center mb-2">
            <h3>
              {user.name} {user.lastName}
            </h3>
            <h3>{user.email}</h3>
          </div>
          <button
            className="btn !btn-outline btn-info w-3/4 h-min"
            onClick={() => {
              route.push(`/user/${user.name}`);
              closeModal();
            }}
          >
            {t("perfil.verPerfil")}
          </button>
        </div>
        <div className="grid items-center">
          <hr className="w-full" />
          <ButtonBgOut
            title={t("perfil.cerrarSesion")}
            styles={"!text-black"}
          />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="none"
        onChange={handleImgProfile}
      />
    </>
  );
};

export default ModalUserProfile;
