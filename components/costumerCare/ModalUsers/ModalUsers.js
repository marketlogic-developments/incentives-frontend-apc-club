import React from "react";

const ModalUsers = ({ userDataToModal, token }) => {
  const handleChangeCheckbox = (e) => {
    axios.patch(
      `${process.env.BACKURL}/users/${userDataToModal.id}`,
      {
        operationStatusId: e.target.checked === false ? 5 : 4,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  console.log(userDataToModal);

  return (
    <div>
      <div>
        <h2>Activar/Desactivar Usuario</h2>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          defaultChecked={
            userDataToModal.operationStatusId === 4 ? true : false
          }
          onChange={handleChangeCheckbox}
        />
      </div>
    </div>
  );
};

export default ModalUsers;
