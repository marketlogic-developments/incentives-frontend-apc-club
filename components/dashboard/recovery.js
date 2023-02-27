import { Modal } from "@mantine/core";
import React from "react";

const Recovery = ({ opened, setOpened, t }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      size={"40%"}
    >
      <div className="flex flex-col w-full gap-5 items-center">
        <h2 className="text-primary text-2xl">
          <strong> Recupera tu contraseña</strong>
        </h2>
        <p className="text-xl">
          Escribe tu correo electrónico y pronto recibirás las instrucciónes
          para recuperar tu contraseña.
        </p>
        <input
          type="email"
          placeholder={t("login.Email")}
          className="input input-bordered w-full"
        />
        <></>
      </div>
    </Modal>
  );
};

export default Recovery;
