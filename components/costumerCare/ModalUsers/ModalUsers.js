import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/reducers/users.reducer";
import Swal from "sweetalert2";

const ModalUsers = ({ userDataToModal, token }) => {
  const [formData, setFormData] = useState({
    birthDate: "",
    companyId: "",
    countryId: "",
    distributionChannelId: "",
    email: "",
    languageId: "",
    lastName: "",
    names: "",
    operationStatusId: "",
    passwordReset: "",
    phoneNumber: "",
    policy: "",
    profilePhotoPath: "",
    region: "",
    roleId: "",
  });

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [companyData, setCompanyData] = useState([]);
  const [distribuitorData, setDistribuitorData] = useState([]);
  const [changePassword, setChangePassword] = useState("");

  const paisesAmerica = ["COLOMBIA", "BRASIL", "NOLA - SOLA - MEX", "CHILE"];

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

  useEffect(() => {
    setFormData(userDataToModal);

    if (userDataToModal.companyId === null) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-channel`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return setDistribuitorData(res.data);
        });
    } else {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return setCompanyData(res.data);
        });
    }
  }, []);

  const handleChangeCheckbox = (e) => {
    if (e.target.name === "operationStatusId")
      return setFormData({
        ...formData,
        [e.target.name]: e.target.checked === true ? 4 : 5,
      });

    return setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const obj = {
      birthDate: "",

      email: formData.email === userDataToModal.email ? null : formData.email,
      languageId: Number(formData.languageId),
      lastName: formData.lastName,
      names: formData.names,
      operationStatusId: Number(formData.operationStatusId),
      passwordReset: formData.passwordReset,
      phoneNumber: formData.phoneNumber,
      policy: formData.policy,
      profilePhotoPath: formData.profilePhotoPath,
      region: formData.region,
      roleId: Number(formData.roleId),
      distributionChannelId: Number(formData.distributionChannelId),
      companyId: Number(formData.companyId),
    };

    const elementosFiltrados = Object.entries(obj)
      .filter(([clave, valor]) => valor !== "" && valor !== null && valor !== 0)
      .reduce((acc, [clave, valor]) => {
        acc[clave] = valor;
        return acc;
      }, {});

    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userDataToModal.id}`,
        {
          ...elementosFiltrados,
          countryId:
            formData.countryId.length > 0 || formData.countryId === null
              ? formData.countryId
              : null,
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
        dispatch(getUsers([obj, ...users]));
        return Toast.fire({
          icon: "success",
          title: "Usuario actualizado",
          background: "#000000",
          color: "#fff",
        });
      })
      .catch(() => {
        return Toast.fire({
          icon: "error",
          title: "El usuario no pudo ser actualizado",
          background: "#000000",
          color: "#fff",
        });
      });
  };

  const handleChangePassword = () => {
    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userDataToModal.id}`,
        {
          password: changePassword,
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
        dispatch(getUsers());
        return Toast.fire({
          icon: "success",
          title: "Contraseña de usuario actualizado",
          background: "#000000",
          color: "#fff",
        });
      })
      .catch(() => {
        return Toast.fire({
          icon: "error",
          title: "El usuario no pudo ser actualizado",
          background: "#000000",
          color: "#fff",
        });
      });
  };

  if (
    formData.email === "" &&
    (distribuitorData.length === 0 || companyData.length === 0)
  ) {
    return <div className="lds-dual-ring"></div>;
  }

  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="font-bold text-xl text-[#eb1000]">
        Cambiar datos de usuario
      </p>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="names"
            defaultValue={formData.names}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Apellido</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="lastName"
            defaultValue={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full input-sm"
            name="email"
            defaultValue={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Teléfono</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full input-sm"
            name="phoneNumber"
            defaultValue={
              formData.phoneNumber === null || formData.phoneNumber.length === 0
                ? "No tiene teléfono"
                : formData.phoneNumber
            }
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Fecha de Nacimiento</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full input-sm"
            name="phoneNumber"
            defaultValue={
              formData.birthDate === null || formData.birthDate.length === 0
                ? "No tiene fecha de nacimiento"
                : formData.birthDate
            }
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Link foto de perfil</span>
          </label>
          <input
            type="profilePhotoPath"
            className="input input-bordered w-full input-sm"
            name="phoneNumber"
            defaultValue={
              formData.profilePhotoPath === null ||
              formData.profilePhotoPath.length === 0
                ? "No tiene foto de perfil"
                : formData.profilePhotoPath
            }
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Rol</span>
          </label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleInputChange}
            className="input input-bordered w-full input-sm"
          >
            <option value="1">Super Admin</option>
            <option value="2">Partner Principal</option>
            <option value="3">Partner Admin</option>
            <option value="5">Sales Rep</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Idioma</span>
          </label>
          <select
            name="languageId"
            value={formData.languageId}
            onChange={handleInputChange}
            className="input input-bordered w-full input-sm"
          >
            <option value="1">Portugués</option>
            <option value="2">Español</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Región</span>
          </label>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="input input-bordered w-full input-sm"
          >
            <option value="BRAZIL">BRAZIL</option>
            <option value="NOLA">NOLA</option>
            <option value="SOLA">SOLA</option>
            <option value="MEXICO">MEXICO</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Tipo de Catálogo</span>
          </label>
          <select
            name="countryId"
            value={formData.countryId}
            onChange={handleInputChange}
            className="input input-bordered w-full input-sm"
          >
            <option value={""}>¿Cual catálogo va a ver el usuario?</option>
            {paisesAmerica.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Activar/Desactivar Usuario</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            name="operationStatusId"
            defaultChecked={formData.operationStatusId === 4 ? true : false}
            onChange={handleChangeCheckbox}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Términos y Condiciones</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            name="policy"
            defaultChecked={formData.policy}
            onChange={handleChangeCheckbox}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Pop-up reestablecer contraseña</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            name="passwordReset"
            defaultChecked={!formData.passwordReset}
            onChange={handleChangeCheckbox}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">
              {userDataToModal.companyId === null ? "Distribuidor" : "Canal"}
            </span>
          </label>
          {userDataToModal.companyId === null ? (
            <select
              name="distributionChannelId"
              value={formData.distributionChannelId}
              onChange={handleInputChange}
              className="input input-bordered w-full input-sm"
            >
              {distribuitorData.map((e) => {
                return <option value={e.id}>{e.nameDist}</option>;
              })}
            </select>
          ) : (
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleInputChange}
              className="input input-bordered w-full input-sm"
            >
              {companyData.map((e) => {
                return <option value={e.id}>{e.name}</option>;
              })}
            </select>
          )}
        </div>
        <div className="w-full col-span-2 flex justify-center">
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-1/2 btn-sm"
          >
            Actualizar Datos
          </button>
        </div>
      </div>
      <p className="font-bold text-xl text-[#eb1000]">
        Cambiar contraseña de usuario
      </p>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="label">
            <span className="label-text">Cambiar contraseña del usuario</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            placeholder="Ingresa la nueva contraseña"
            onChange={(e) => setChangePassword(e.target.value)}
          />
        </div>
        <div className="w-full col-span-2 flex justify-center">
          <button
            onClick={handleChangePassword}
            className="btn btn-primary w-1/2 btn-sm"
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUsers;
