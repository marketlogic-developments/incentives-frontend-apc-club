import { useRouter } from "next/router";
import { Modal } from "@mantine/core";
import React, { useState, useMemo, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  policyAndPassword,
  userUpdate,
} from "../../store/reducers/users.reducer";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const UserOptions = ({ user, token, logout, menuUser, setMenuUser }) => {
  const route = useRouter();

  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const [nInputs, setNInputs] = useState(0);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [image, setImage] = useState({});
  const [viewimage, setviewImage] = useState("");

  const sections = [
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 9C2.25 9 1.6875 8.78907 1.6875 7.875C1.6875 6.96094 2.25 6.75 2.25 6.75M15.75 8.64844C15.75 8.64844 16.3125 8.49621 16.3125 7.875C16.3125 7.25379 15.75 7.10157 15.75 7.10157M9.00002 5.625V10.125M3.93751 5.625V10.125M14.3417 1.83586C14.3417 1.83586 11.2957 5.625 8.43752 5.625H2.8125C2.66332 5.625 2.52024 5.68427 2.41475 5.78976C2.30926 5.89524 2.25 6.03832 2.25 6.1875V9.5625C2.25 9.71169 2.30926 9.85476 2.41475 9.96025C2.52024 10.0657 2.66332 10.125 2.8125 10.125H8.43752C11.2957 10.125 14.3417 13.93 14.3417 13.93C14.5547 14.2112 15.1875 14.0186 15.1875 13.5844V2.17969C15.1875 1.74692 14.5899 1.51805 14.3417 1.83586Z"
            stroke="#232B2F"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.25 9C2.25 9 1.6875 8.78907 1.6875 7.875C1.6875 6.96094 2.25 6.75 2.25 6.75M15.75 8.64844C15.75 8.64844 16.3125 8.49621 16.3125 7.875C16.3125 7.25379 15.75 7.10157 15.75 7.10157M9.00002 5.625V10.125M3.93751 5.625V10.125M14.3417 1.83586C14.3417 1.83586 11.2957 5.625 8.43752 5.625H2.8125C2.66332 5.625 2.52024 5.68427 2.41475 5.78976C2.30926 5.89524 2.25 6.03832 2.25 6.1875V9.5625C2.25 9.71169 2.30926 9.85476 2.41475 9.96025C2.52024 10.0657 2.66332 10.125 2.8125 10.125H8.43752C11.2957 10.125 14.3417 13.93 14.3417 13.93C14.5547 14.2112 15.1875 14.0186 15.1875 13.5844V2.17969C15.1875 1.74692 14.5899 1.51805 14.3417 1.83586Z"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.0625 10.125V16.0313C5.0625 16.1058 5.09213 16.1774 5.14488 16.2301C5.19762 16.2829 5.26916 16.3125 5.34375 16.3125H7.20704C7.29515 16.3125 7.38204 16.2919 7.4607 16.2522C7.53937 16.2124 7.6076 16.1548 7.6599 16.0839C7.71221 16.013 7.74712 15.9308 7.76183 15.8439C7.77653 15.757 7.77063 15.6679 7.74458 15.5837C7.44997 14.6387 6.75 13.5731 6.75 11.8125H7.31251C7.46169 11.8125 7.60476 11.7532 7.71025 11.6478C7.81574 11.5423 7.87501 11.3992 7.87501 11.25V10.6875C7.87501 10.5383 7.81574 10.3952 7.71025 10.2898C7.60476 10.1843 7.46169 10.125 7.31251 10.125H6.75"
            stroke="#232B2F"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.0625 10.125V16.0313C5.0625 16.1058 5.09213 16.1774 5.14488 16.2301C5.19762 16.2829 5.26916 16.3125 5.34375 16.3125H7.20704C7.29515 16.3125 7.38204 16.2919 7.4607 16.2522C7.53937 16.2124 7.6076 16.1548 7.6599 16.0839C7.71221 16.013 7.74712 15.9308 7.76183 15.8439C7.77653 15.757 7.77063 15.6679 7.74458 15.5837C7.44997 14.6387 6.75 13.5731 6.75 11.8125H7.31251C7.46169 11.8125 7.60476 11.7532 7.71025 11.6478C7.81574 11.5423 7.87501 11.3992 7.87501 11.25V10.6875C7.87501 10.5383 7.81574 10.3952 7.71025 10.2898C7.60476 10.1843 7.46169 10.125 7.31251 10.125H6.75"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      nombre: "Comunicados",
      page: "/releases",
    },
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99999 2.81253C7.77621 2.81253 6.57992 3.17542 5.56239 3.85531C4.54486 4.5352 3.75179 5.50156 3.28347 6.63217C2.81515 7.76279 2.69262 9.00689 2.93136 10.2071C3.17011 11.4074 3.75941 12.5099 4.62475 13.3752C5.49009 14.2406 6.5926 14.8299 7.79286 15.0686C8.99312 15.3074 10.2372 15.1848 11.3678 14.7165C12.4985 14.2482 13.4648 13.4551 14.1447 12.4376C14.8246 11.4201 15.1875 10.2238 15.1875 9.00003C15.1875 7.359 14.5356 5.78518 13.3752 4.6248C12.2148 3.46442 10.641 2.81253 8.99999 2.81253Z"
            stroke="#232B2F"
            stroke-width="1.25"
            stroke-miterlimit="10"
          />
          <path
            d="M8.99999 2.81253C7.77621 2.81253 6.57992 3.17542 5.56239 3.85531C4.54486 4.5352 3.75179 5.50156 3.28347 6.63217C2.81515 7.76279 2.69262 9.00689 2.93136 10.2071C3.17011 11.4074 3.75941 12.5099 4.62475 13.3752C5.49009 14.2406 6.5926 14.8299 7.79286 15.0686C8.99312 15.3074 10.2372 15.1848 11.3678 14.7165C12.4985 14.2482 13.4648 13.4551 14.1447 12.4376C14.8246 11.4201 15.1875 10.2238 15.1875 9.00003C15.1875 7.359 14.5356 5.78518 13.3752 4.6248C12.2148 3.46442 10.641 2.81253 8.99999 2.81253Z"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.25"
            stroke-miterlimit="10"
          />
          <path
            d="M7.03125 7.11176C7.03125 7.11176 7.06078 6.49652 7.71926 5.96672C8.10985 5.65207 8.57813 5.56102 9 5.55469C9.38426 5.54977 9.72739 5.6134 9.9327 5.71113C10.2843 5.87848 10.9688 6.28699 10.9688 7.1557C10.9688 8.06976 10.3711 8.48496 9.69012 8.94164C9.00915 9.39832 8.82422 9.89402 8.82422 10.4062"
            stroke="black"
            stroke-width="1.09375"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M8.78906 12.9375C9.17739 12.9375 9.49219 12.6227 9.49219 12.2344C9.49219 11.846 9.17739 11.5312 8.78906 11.5312C8.40074 11.5312 8.08594 11.846 8.08594 12.2344C8.08594 12.6227 8.40074 12.9375 8.78906 12.9375Z"
            fill="black"
          />
        </svg>
      ),
      nombre: "Preguntas frecuentes",
      page: "/ask",
    },
  ];

  const fileInputRef = useRef(null);

  const openFileInput = (event) => {
    event.stopPropagation();
    fileInputRef.current.click();
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const deleteProfileImage = () => {
    return axios
      .patch(
        `${process.env.BACKURL}/users/${user.id}`,
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
        return Toast.fire({
          icon: "success",
          title: t("user.fotoDelete"),
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
            `${process.env.BACKURL}/users/${user.id}`,
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
            return Toast.fire({
              icon: "success",
              title: t("user.fotoUpdate"),
            });
          });
      })
      .catch((error) => console.log(error));
  };

  console.log(user.profilePhotoPath);

  return (
    <>
      <div
        className="w-full bg-[#FFFF] absolute top-[65px] right-0 p-4 max-w-[310px] flex flex-col gap-6 items-center mr-6"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
        }}
      >
        <div className="w-full flex justify-center">
          <div className="w-3/4 justify-center flex flex-col items-center gap-3">
            {/* START */}
            <div className="relative bg-[#1473E6] rounded-full w-[80px] h-[80px] flex items-center justify-center">
              {user.profilePhotoPath === null ||
              user.profilePhotoPath === "" ||
              user.profilePhotoPath === "noImage" ? (
                <p className="text-white absolute !text-base">
                  {user.names.split("")[0]}
                </p>
              ) : (
                <img
                  src={user.profilePhotoPath}
                  className="w-full h-full rounded-full"
                  alt="Avatar"
                />
              )}
              <div class="relative h-full w-full">
                {user.profilePhotoPath === null ||
                user.profilePhotoPath === "" ||
                user.profilePhotoPath === "noImage" ? (
                  <div
                    class="absolute h-full w-full left-14 -top-0 "
                    onClick={openFileInput}
                  >
                    <label className="btn btn-circle btn-sm bg-gray-300	border-none hover:bg-gray-400 drop-shadow-lg text-black">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1497_15522)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.6875 15.75V7.875C19.6875 7.5269 19.5492 7.19306 19.3031 6.94692C19.0569 6.70078 18.7231 6.5625 18.375 6.5625H16.8368C15.793 6.56193 14.7922 6.14697 14.0543 5.40881L12.9649 4.32206C12.7194 4.07655 12.3867 3.93827 12.0396 3.9375H8.96175C8.61368 3.93757 8.2799 4.0759 8.03381 4.32206L6.94706 5.40881C6.20881 6.14729 5.20745 6.56228 4.16325 6.5625H2.625C2.2769 6.5625 1.94306 6.70078 1.69692 6.94692C1.45078 7.19306 1.3125 7.5269 1.3125 7.875V15.75C1.3125 16.0981 1.45078 16.4319 1.69692 16.6781C1.94306 16.9242 2.2769 17.0625 2.625 17.0625H18.375C18.7231 17.0625 19.0569 16.9242 19.3031 16.6781C19.5492 16.4319 19.6875 16.0981 19.6875 15.75ZM2.625 5.25C1.92881 5.25 1.26113 5.52656 0.768845 6.01884C0.276562 6.51113 0 7.17881 0 7.875L0 15.75C0 16.4462 0.276562 17.1139 0.768845 17.6062C1.26113 18.0984 1.92881 18.375 2.625 18.375H18.375C19.0712 18.375 19.7389 18.0984 20.2312 17.6062C20.7234 17.1139 21 16.4462 21 15.75V7.875C21 7.17881 20.7234 6.51113 20.2312 6.01884C19.7389 5.52656 19.0712 5.25 18.375 5.25H16.8368C16.1406 5.24985 15.473 4.97319 14.9809 4.48088L13.8941 3.39412C13.402 2.90181 12.7344 2.62515 12.0382 2.625H8.96175C8.26561 2.62515 7.59804 2.90181 7.10588 3.39412L6.01912 4.48088C5.52696 4.97319 4.85939 5.24985 4.16325 5.25H2.625Z"
                            fill="#8D8D8D"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.5 14.4375C11.3702 14.4375 12.2048 14.0918 12.8202 13.4764C13.4355 12.8611 13.7812 12.0265 13.7812 11.1562C13.7812 10.286 13.4355 9.45141 12.8202 8.83606C12.2048 8.2207 11.3702 7.875 10.5 7.875C9.62976 7.875 8.79516 8.2207 8.17981 8.83606C7.56445 9.45141 7.21875 10.286 7.21875 11.1562C7.21875 12.0265 7.56445 12.8611 8.17981 13.4764C8.79516 14.0918 9.62976 14.4375 10.5 14.4375ZM10.5 15.75C11.7183 15.75 12.8868 15.266 13.7483 14.4045C14.6098 13.543 15.0938 12.3746 15.0938 11.1562C15.0938 9.93791 14.6098 8.76947 13.7483 7.90798C12.8868 7.04648 11.7183 6.5625 10.5 6.5625C9.28166 6.5625 8.11322 7.04648 7.25173 7.90798C6.39023 8.76947 5.90625 9.93791 5.90625 11.1562C5.90625 12.3746 6.39023 13.543 7.25173 14.4045C8.11322 15.266 9.28166 15.75 10.5 15.75Z"
                            fill="#8D8D8D"
                          />
                          <path
                            d="M3.9375 8.53125C3.9375 8.7053 3.86836 8.87222 3.74529 8.99529C3.62222 9.11836 3.4553 9.1875 3.28125 9.1875C3.1072 9.1875 2.94028 9.11836 2.81721 8.99529C2.69414 8.87222 2.625 8.7053 2.625 8.53125C2.625 8.3572 2.69414 8.19028 2.81721 8.06721C2.94028 7.94414 3.1072 7.875 3.28125 7.875C3.4553 7.875 3.62222 7.94414 3.74529 8.06721C3.86836 8.19028 3.9375 8.3572 3.9375 8.53125Z"
                            fill="#8D8D8D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1497_15522">
                            <rect width="21" height="21" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </label>
                  </div>
                ) : (
                  <div class="absolute h-full w-full -left-5 -top-1 ">
                    <button
                      className="btn btn-circle btn-sm bg-gray-300	border-none hover:bg-gray-400 drop-shadow-lg !text-black"
                      onClick={deleteProfileImage}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* END */}
            <div className="text-center">
              <p className="lg:!text-sm xl:!text-base">
                {user.name} {user.lastName}
              </p>
              <p className="xl:!text-xs">{user.email}</p>
            </div>
            <button
              className="btn !btn-outline btn-info w-3/4 min-h-[2.563rem] h-[2.563rem]"
              onClick={() => {
                route.push(`/user/${user.name}`);
                setMenuUser(!menuUser);
              }}
            >
              Ver perfil
            </button>
          </div>
        </div>
        <div className="w-[70%] flex flex-col items-center">
          <hr className="w-full" />
          <p
            className="!text-xs mt-6 font-bold cursor-pointer"
            onClick={logout}
          >
            Cerrar Sesión
          </p>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="none"
        onChange={handleImgProfile}
      ></input>
    </>
  );
};

export default UserOptions;
