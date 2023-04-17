import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import {
  awardsPush,
  getDataAwards,
  pushReward,
} from "../store/reducers/awards.reducer";
import * as XLSX from "xlsx";
import { Modal } from "@mantine/core";
import axios from "axios";
import Swal from "sweetalert2";
import ImportacionPremios from "../components/premios/ImportacionPremios";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";

const premios = () => {
  const [formData, setFormData] = useState({
    name: "",
    digipoints: "",
    price: "",
    imagePath: "",
    status: true,
    description: "",
  });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const awards = useSelector((state) => state.awards.awards);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 7;
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);

  useEffect(() => {
    if (token && awards.length === 0) {
      dispatch(getDataAwards(token, user));
    }
  }, [token]);

  const handleChange = (e) => {
    if (["digipoints", "price"].includes(e.target.name)) {
      return setFormData({
        ...formData,
        [e.target.name]: Number(e.target.value),
      });
    }

    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (data) => {
    data.preventDefault();

    axios
      .post(`${process.env.BACKURL}/awards`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(awardsPush([res.data]));

        setFormData({
          name: "",
          digipoints: "",
          price: "",
          imagePath: "",
          status: true,
          description: "",
        });
      })
      .catch(() => {
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

        return Toast.fire({
          icon: "error",
          title: "Faltan campos por llenar",
        });
      });
  };

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6">
                {t("tabla.nombre")}
              </th>
              <th scope="col" className="py-3 px-6">
                Digipoints
              </th>
              <th scope="col" className="py-3 px-6">
                {t("tabla.precio")}
              </th>
              <th scope="col" className="py-3 px-6">
                Región
              </th>
              <th scope="col" className="py-3 px-6">
                {t("tabla.imagen")}
              </th>
            </tr>
          </thead>
          <tbody>
            {[...currentItems]
              .reverse()
              .map(
                ({ id, name, digipoints, price, imagePath, description }) => (
                  <tr
                    className="bg-white border-b dark:border-gray-500"
                    key={id}
                  >
                    <td className="py-4 px-6">{name}</td>
                    <td className="py-4 px-6">{digipoints}</td>
                    <td className="py-4 px-6">{price}</td>
                    <td className="py-4 px-6">{description}</td>
                    <td className="py-4 px-6 w-32">
                      <figure>
                        <img src={imagePath} />
                      </figure>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;

    return awards.slice(itemOffset, endOffset);
  }, [itemOffset, awards]);

  const pageCount = useMemo(
    () => Math.ceil(awards.length / itemsPerPage),
    [awards, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % awards.length;

    setItemOffset(newOffset);
  };

  const importFile = (data) => {
    // const workbook = XLSX.utils.book_new();
    // const sheet = XLSX.utils.json_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    // XLSX.writeFile(workbook, "Liste_De_Premios.xlsx");

    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Tarjetas-2023.csv");
    });
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div className="flex flex-col items-center p-10">
          <h3 className="text-lg font-bold text-red-500">Agregar Premio</h3>
          <p className="py-4">Indica la información del premio</p>
          <form
            onSubmit={(info) => {
              handleSubmit(info);
            }}
            className="w-full"
          >
            <div className="w-full flex flex-col items-center gap-5">
              <div className="form-control w-9/12">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre del premio"
                  className="input input-bordered w-full"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
                <label className="label">
                  <span className="label-text">Valor en Digipoints</span>
                </label>
                <input
                  type="number"
                  placeholder="Ingrese el numero del valor"
                  className="input input-bordered w-full"
                  name="digipoints"
                  onChange={handleChange}
                  value={formData.digipoints}
                />
                <label className="label">
                  <span className="label-text">Valor en Dolares</span>
                </label>
                <div className="flex reverse">
                  <input
                    type="number"
                    placeholder="Ingrese el numero del valor"
                    className="input input-bordered w-full 3/4"
                    name="price"
                    onChange={handleChange}
                    value={formData.price}
                  />
                </div>
                <label className="label">
                  <span className="label-text">Región</span>
                </label>
                <select
                  className="input input-bordered w-1/2"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                >
                  <option value="">Región</option>
                  <option value="BRA">BRASIL</option>
                  <option value="NOLA-SOLA-MEX">NOLA - SOLA - MEX</option>
                  <option value="CH">CHILE</option>
                </select>

                <label className="label">
                  <span className="label-text">
                    Agrega la imagen del premio
                  </span>
                </label>
                <div className="flex w-full justify-center gap-8 none">
                  <div>
                    <strong className="text-sm">Subir imagen (jpg,png)</strong>
                    <p className="text-xs">Peso máximo 5MB</p>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-error w-full max-w-xs"
                    name="imagePath"
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  placeholder="O ingrese el link del archivo"
                  className="input input-bordered w-full 3/4"
                  name="imagePath"
                  onChange={handleChange}
                  value={formData.imagePath}
                />
              </div>

              <button htmlFor="my-modal-4" className="btn btn-primary w-2/4">
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      );
    }

    if (modal === 1) {
      return <ImportacionPremios />;
    }
  }, [modal, formData]);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} size={"50%"}>
        <div className="grid grid-cols-2 place-items-center">
          <p
            className={`p-3 w-full text-center ${
              modal === 0 && "border-b-2 border-[#eb1000] text-[#eb1000]"
            }`}
            onClick={() => setModal(0)}
          >
            Agregar premio
          </p>
          <p
            className={`p-3 w-full text-center ${
              modal === 1 && "border-b-2 border-[#eb1000] text-[#eb1000]"
            }`}
            onClick={() => setModal(1)}
          >
            Importar premios
          </p>
        </div>
        {typeModal}
      </Modal>
      <ContainerContent pageTitle={"Premios"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{t("menu.Premios")}</h1>
          </div>
          <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4 mt-4 place-items-end">
                <div className="w-full flex justify-end gap-10">
                  {user.roleId === 1 && (
                    <button
                      className="btn btn-primary w-max"
                      onClick={() => setOpened(true)}
                    >
                      {t("premios.agregar")}
                    </button>
                  )}

                  <button
                    className="btn btn-primary w-max"
                    onClick={() => importFile(awards)}
                  >
                    Exportar
                  </button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="container">
              <div className="overflow-x-auto relative">
                {loading && <div className="lds-dual-ring"></div>}
                {!loading && <Table currentItems={currentItems} />}
                {!loading && (
                  <ReactPaginate
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    nextClassName={"item next "}
                    previousClassName={"item previous"}
                    activeClassName={"item active "}
                    breakClassName={"item break-me "}
                    breakLabel={"..."}
                    disabledClassName={"disabled-page"}
                    pageClassName={"item pagination-page "}
                    nextLabel={
                      <FaChevronRight
                        style={{ color: "#000", fontSize: "20" }}
                      />
                    }
                    previousLabel={
                      <FaChevronLeft
                        style={{ color: "#000", fontSize: "20" }}
                      />
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1],
    },
  };
}

export default premios;
