import React from "react";
import { useDispatch } from "react-redux";
import { listUsers } from "services/User/user.service";

const ListUser = () => {
    const dispatch=useDispatch()

  const ListAllUsers = async (): Promise<void> => {
    try {
      const res = await listUsers();
      if (!res) throw new Error("Failed to get users");


    } catch (err) {
      console.error(err);
    }
  };

  return { ListAllUsers };
};

export default ListUser;
