import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Modal } from "@mantine/core";
import axios from "axios";
import { getRolesData, getUsersData } from "../../store/reducers/users.reducer";
import AgregarParticipante from "../participantes/AgregarParticipante";

const Participantes = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const company = useSelector((state) => state.user.company);
  const [participantes, setParticipantes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [participantesConRol, setParticipantesConRol] = useState([]);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [userDataToModal, setUserDataToModal] = useState({
    person: [{ operationStatusId: 0 }],
  });

  useEffect(() => {
    if (participantes.length === 0) setIsLoaded(true);
  }, [participantes]);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      axios
        .get(
          `${process.env.BACKURL}/reporters/company-all-users-by-id/${company.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          setParticipantes(data);
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

  const handleChangeCheckbox = (e) => {
    axios.patch(
      `${process.env.BACKURL}/users/${userDataToModal.id}`,
      {
        person: {
          personId: userDataToModal.person[0]?.id,
          operationStatusId: e.target.checked === false ? 5 : 4,
        },
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

  const getUser = (userData) => {
    axios
      .get(`${process.env.BACKURL}/users/${userData.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserDataToModal(res.data);
        return setOpened(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const quitUser = () => {
    axios
      .patch(
        `${process.env.BACKURL}/users/${userDataToModal.id}`,
        { companyId: 0 },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setParticipantes(
          participantes.filter(({ email }) => email !== res.data.email)
        );
        return setOpened(false);
      });
  };

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                {t("participantes.nombre")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.correo")}
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.fecha")}
              </th>
            </tr>
          </thead>
          <tbody>
            {search !== ""
              ? participantes
                  .filter(({ email }) =>
                    email.startsWith(search.toLocaleLowerCase())
                  )
                  .map((user2, index) => (
                    <tr
                      key={index}
                      className={`bg-white border-b dark:border-gray-500 ${
                        [1, 3].includes(user.roleId)
                          ? "cursor-pointer hover:bg-warning"
                          : ""
                      }`}
                      onClick={() => {
                        if ([1, 3].includes(user.roleId)) {
                          return getUser(user2);
                        }
                      }}
                    >
                      <td className="py-4 px-2">{user2.name}</td>
                      <td className="py-4 px-2">{user2.email}</td>
                      <td className="py-4 px-2">
                        {moment(user2.date).format("MM/DD/YYYY")}
                      </td>
                    </tr>
                  ))
              : participantes.map((user2, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b dark:border-gray-500 ${
                      [1, 3].includes(user.roleId)
                        ? "cursor-pointer hover:bg-warning"
                        : ""
                    }`}
                    onClick={() => {
                      if ([1, 3].includes(user.roleId)) {
                        return getUser(user2);
                      }
                    }}
                  >
                    <td className="py-4 px-2">{user2.name}</td>
                    <td className="py-4 px-2">{user2.email}</td>
                    <td className="py-4 px-2">
                      {moment(user2.date).format("MM/DD/YYYY")}
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={"30%"}
        centered
      >
        <div className="grid grid-cols-2 place-items-center">
          <div className="flex flex-col items-center gap-10 w-full border-r-2">
            <h2 className="text-2xl text-center">Activar/Desactivar Usuario</h2>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              defaultChecked={
                userDataToModal.person[0]?.operationStatusId === 4
                  ? true
                  : false
              }
              onChange={handleChangeCheckbox}
            />
          </div>
          <div className="flex flex-col items-center gap-10 w-full">
            <button className="btn btn-primary" onClick={quitUser}>
              Quitar participante
            </button>
          </div>
        </div>
      </Modal>
      {[2, 5].includes(user.roleId) && (
        <div className="px-5 flex">
          <p className="text-2xl">
            <strong className="text-[#eb1000] font-bold text-2xl">
              Partner Admin:
            </strong>{" "}
            {company.partnerAdmin?.name}
          </p>
        </div>
      )}
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white flex flex-col gap-5">
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
              {[1, 3].includes(user?.roleId) && (
                <AgregarParticipante
                  setParticipantes={setParticipantes}
                  participantes={participantes}
                />
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <Table currentItems={currentItems} />
        )}

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
    </>
  );
};

export default Participantes;
