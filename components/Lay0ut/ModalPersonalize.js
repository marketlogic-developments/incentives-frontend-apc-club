import React from "react";
import client from "../../contentful";
import { useState } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../store/reducers/contentful.reducer";
import { userUpdate } from "../../store/reducers/users.reducer";
import axios from "axios";

const ModalPersonalize = ({ onClose }) => {
  const video = useSelector((state) => state.contentful.videos[0]);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleVideo = () => {
    axios
      .patch(
        `${process.env.BACKURL}/users/${user.id}`,
        {
          cpf: "viewVideo",
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
        console.log("aaaa");
        dispatch(userUpdate({ cpf: "viewVideo" }));
      })
      .catch((e) => console.log(e))
      .finally(() => {
        onClose(false);
      });
  };

  return (
    <div className="w-screen h-screen animationVideo">
      <ReactPlayer
        url={video.linkUrl}
        controls
        playing={true}
        width={"100%"}
        height={"100%"}
        muted
        onEnded={handleVideo}
      />
    </div>
  );
};

export default ModalPersonalize;
