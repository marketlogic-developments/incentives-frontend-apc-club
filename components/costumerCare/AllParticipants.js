import Head from "next/head";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../containerContent";
import { getUsersData, getRolesData } from "../../store/reducers/users.reducer";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Modal } from "@mantine/core";
import axios from "axios";
import ButtonParticipants from "./ButtonParticipants";
import ModalUsers from "./ModalUsers/ModalUsers";
import { getCompanyAll } from "../../store/reducers/company.reducer";
import SelectInputValue from "../inputs/SelectInputValue";
import { ArrowDown } from "../icons";

const AllParticipants = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [participantes, setParticipantes] = useState([]);
  const [roles, setRoles] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [userDataToModal, setUserDataToModal] = useState({});

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return participantes
      .filter((data) => {
        if (search !== "") {
          setRoles("");
          return data.email.startsWith(search.toLocaleLowerCase());
        }

        if (roles !== "") {
          setSearch("");
          return data.position === roles;
        }

        return data;
      })
      .slice(itemOffset, endOffset);
  }, [itemOffset, participantes, search, roles]);

  const pageCount = useMemo(
    () =>
      Math.ceil(
        participantes.filter((data) => {
          if (search !== "") {
            setRoles("");
            return data.email.startsWith(search.toLocaleLowerCase());
          }

          if (roles !== "") {
            setSearch("");
            return data.position === roles;
          }

          return data;
        }).length / itemsPerPage
      ),
    [itemsPerPage, participantes, search, roles]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % participantes.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (participantes.length === 0) setIsLoaded(true);
  }, [participantes]);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getUsersData(token))
        .then((participantes) => {
          setParticipantes(participantes.payload);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded, token]);

  const viewTable = (data) => {
    return data.map((user2, index) => (
      <tr
        key={index}
        className={`${
          user?.roleId === 1 ? "cursor-pointer hover:bg-warning " : ""
        }${(index + 1) % 2 === 0 && "bg-[#F5F5F5]"}`}
        onClick={() => {
          setUserDataToModal({ ...user2, index: index });
          setOpened(true);
        }}
      >
        <td className="py-4 px-2">{`${user2.names} ${
          user2.lastname || ""
        }`}</td>
        <td className="py-4 px-2">{user2.email}</td>
        <td className="py-4 px-2">
          {user2.roleId === 1
            ? "SuperAdmin"
            : user2.roleId === 2
            ? "Partner Principal"
            : user2.roleId === 3
            ? "Partner Admin"
            : user2.roleId === 5
            ? "Sales Rep"
            : ""}
        </td>
        <td className="py-4 px-2">
          {moment(user2.CreatedAt).format("MM/DD/YYYY")}
        </td>
      </tr>
    ));
  };

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500 tableJustify overflow-hidden rounded-md">
          <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
            <tr>
              <th scope="col" className="py-2 px-2">
                Nombre
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.correo")}
              </th>
              <th scope="col" className="py-2 px-2">
                Rol
              </th>
              <th scope="col" className="py-2 px-2">
                {t("participantes.fecha")}
              </th>
            </tr>
          </thead>
          <tbody>
            {search !== ""
              ? viewTable(
                  participantes.filter(({ email }) =>
                    email.startsWith(search.toLocaleLowerCase())
                  )
                )
              : viewTable(participantes)}
          </tbody>
        </table>
      </>
    );
  }

  const userRols = useMemo(
    () => [...new Set(participantes.map(({ position }) => position))],
    [participantes]
  );

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} size={"60%"}>
        <ModalUsers userDataToModal={userDataToModal} token={token} />
      </Modal>
      <div className="w-full md:w-2/2 rounded-lg flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-center">
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mt-4 w-full place-items-center">
              <div className="relative w-full">
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
                <div className="flex justify-between w-full">
                  <input
                    type="text"
                    onChange={(e) => {
                      setRoles("");
                      setSearch(e.target.value);
                    }}
                    placeholder={t("tabla.buscarEmail")}
                    value={search}
                    className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                </div>
              </div>
              <div className="justify-self-end">
                <SelectInputValue
                  placeholder={"Rol de usuarios"}
                  value={roles}
                  data={userRols}
                  icon={<ArrowDown />}
                  onChange={(e, data) => {
                    setRoles(data);
                    return setSearch("");
                  }}
                  name={"rols"}
                />
              </div>

              {[1].includes(user?.roleId) && <ButtonParticipants />}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <>
            <Table currentItems={currentItems} />
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
          </>
        )}
      </div>
    </>
  );
};

export default AllParticipants;
