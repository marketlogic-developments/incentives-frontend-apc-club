import Head from "next/head";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import { getUsersData, getRolesData } from "../store/reducers/users.reducer";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Modal } from "@mantine/core";

const participantes = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [participantes, setParticipantes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [participantesConRol, setParticipantesConRol] = useState([]);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getUsersData(token))
        .then((participantes) => {
          setLoading(false);
          setParticipantes(participantes.filter((user) => user.roleId === 5));
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch(getRolesData(token))
        .then((roles) => {
          setLoading(false);
          setRoles(roles);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded, token]);

  useEffect(() => {
    if (participantes.length > 0 && roles.length > 0) {
      const joinObjects = (participantes, roles) => {
        const result = [];
        participantes.forEach((part) => {
          roles.forEach((rol) => {
            if (part.roleId === rol.id) {
              result.push({ ...part, nameRol: rol.name });
            }
          });
        });
        return result;
      };
      setParticipantesConRol(joinObjects(participantes, roles));
    }
  }, [participantes, roles]);

  const dataDummy = [];

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                ID
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.nombre")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.correo")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.rol")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.fecha")}
              </th>
            </tr>
          </thead>
          <tbody>
            {search !== ""
              ? dataDummy
                  .filter(({ email }) =>
                    email.startsWith(search.toLocaleLowerCase())
                  )
                  .map((user, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:border-gray-500"
                    >
                      <td className="py-4 px-2">{user.id}</td>
                      <td className="py-4 px-2">{user.name}</td>
                      <td className="py-4 px-2">{user.email}</td>
                      <td className="py-4 px-2">{user.rol}</td>
                      <td className="py-4 px-2">
                        {moment(user.date).format("MM/DD/YYYY")}
                      </td>
                    </tr>
                  ))
              : dataDummy.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:border-gray-500"
                  >
                    <td className="py-4 px-2">{user.id}</td>
                    <td className="py-4 px-2">{user.name}</td>
                    <td className="py-4 px-2">{user.email}</td>
                    <td className="py-4 px-2">{user.rol}</td>
                    <td className="py-4 px-2">
                      {moment(user.date).format("MM/DD/YYYY")}
                    </td>
                  </tr>
                ))}
            {/* {currentItems &&
              currentItems.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-500"
                >
                  <td className="py-4 px-2">{user.id}</td>
                  <td className="py-4 px-2">{user.name}</td>
                  <td className="py-4 px-2">{user.email}</td>
                  <td className="py-4 px-2">{user.nameRol}</td>
                  <td className="py-4 px-2">
                    {moment(user.CreatedAt).format("MM/DD/YYYY")}
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return participantesConRol.slice(itemOffset, endOffset);
  }, [itemOffset, participantesConRol]);
  const pageCount = useMemo(
    () => Math.ceil(participantesConRol.length / itemsPerPage),
    [participantesConRol, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % participantesConRol.length;
    setItemOffset(newOffset);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return setModal(1);
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div>
          <div>
            <h3 className="text-lg font-bold text-red-500">
              Agregar Participante
            </h3>
            <p className="py-4">
              Indica la información del usuario que vas a registrar
            </p>
            <div className="w-full flex flex-col items-center">
              <h3 className="text-lg font-bold text-red-500">
                Información de la Cuenta
              </h3>
              <div className="form-control w-9/12">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Apellido</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Correo Electrónico</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Rol</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Teléfono</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />

                <label className="label">
                  <span className="label-text">CPF</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Fecha de nacimiento</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Fecha de ingreso</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <div className="pt-5 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-outline btn-primary w-max"
                  >
                    Enviar solicitud
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (modal === 2) {
      return (
        <div>
          <div>
            <h3 className="text-lg font-bold text-red-500">Usuario agregado</h3>
            <p className="py-4">Usuario agregado con exito.</p>
          </div>
        </div>
      );
    }
  }, [modal]);
  const isMobile = window.innerWidth <= 768;
  const modalSize = isMobile
    ? { initialWidth: '100%', initialHeight: 'auto' }
    : { initialWidth: '40%', initialHeight: 'auto' };

  return (
    <>
      <ContainerContent pageTitle={"Participantes"}>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          centered
          size={modalSize}
        >
          {typeModal}
        </Modal>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">Participantes</h1>
          </div>
          <div className="w-full md:w-2/2 shadow p-5 rounded-lg bg-white flex flex-col gap-5">
            <div>
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mt-4 w-full place-items-center">
                  <div className="relative col-span-2 w-full">
                    <div className="absolute flex items-center ml-2 h-full">
                      <svg
                        className="w-4 h-4 fill-current text-primary-gray-dark"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                      </svg>
                    </div>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("tabla.buscarEmail")}
                        className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                      />
                    </div>
                  </div>
                  {[1].includes(user?.roleId) && (
                    <button
                      onClick={() => {
                        setOpened(true);
                      }}
                      className="btn bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-max"
                    >
                      {t("tabla.agregarP")}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {loading && <div className="lds-dual-ring"></div>}
            {!loading && <Table currentItems={currentItems} />}
            {/* {!loading && (
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
                  <FaChevronRight style={{ color: "#000", fontSize: "20" }} />
                }
                previousLabel={
                  <FaChevronLeft style={{ color: "#000", fontSize: "20" }} />
                }
              />
            )} */}
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
      userTypes: [1, 2, 3],
    },
  };
}

export default participantes;
