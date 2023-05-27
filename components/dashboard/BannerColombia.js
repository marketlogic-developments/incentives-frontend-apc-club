import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../store/reducers/users.reducer";
import { useRouter } from "next/router";

const BannerColombia = ({ user, token }) => {
  const dispatch = useDispatch();
  const route = useRouter();

  const handleSubmit = () => {
    return axios
      .patch(
        `${process.env.BACKURL}/users/${user?.id}`,
        { policy: false, cpf: "null" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(userUpdate({ policy: false }));
        route.push("/terminosycondiciones");
      })
      .catch((e) => console.log(e));
  };

  return (
    <figure onClick={handleSubmit}>
      <img
        src="assets/dashboard/banners/bannerColombia.webp"
        alt="Sales_PA"
        className="w-full cursor-pointer"
      ></img>
    </figure>
  );
};

export default BannerColombia;
