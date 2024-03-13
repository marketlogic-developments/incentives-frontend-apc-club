import { Modal } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getDigipointsAll } from "../../store/reducers/sales.reducer";
import Cookies from "js-cookie";
import axios from "axios";
import {
  getDigiPoints,
  setDigipoints,
} from "../../store/reducers/users.reducer";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import jsonexport from "jsonexport";
import { saveAs } from "file-saver";

const DigipointsAll = () => {
  const [opened, setOpened] = useState(false);
  const [t, i18n] = useTranslation("global");
  const iduser = useSelector((state) => state.user.user.id);
  const teams = useSelector((state) => state.teams.teams);
  const users = useSelector((state) => state.user.companyUsers);
  const [salesOption, setSalesOption] = useState("salesRep");
  const [numModal, setNumModal] = useState(0);
  const [teamInfo, setTeamInfo] = useState({});
  const [searchByEmail, setSearchByEmail] = useState("");
  const [listUsers, setListUsers] = useState(false);
  const [hover, setHover] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sales.digipa);

  useEffect(() => {
    if (token && data.length === 0) {
      dispatch(getDigipointsAll(token));
    }
  }, [token]);

  const searchUser = () => {
    const searchValue = users.filter(
      ({ email, role_id }) =>
        email.startsWith(searchByEmail.toLocaleLowerCase()) && role_id === 5
    );

    if (searchValue.length !== 0) {
      return searchValue.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchByEmail === "") {
      return users.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchValue.length === 0 && searchByEmail !== "") {
      return (
        <div className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer">
          <p>No hay concidencias encontradas</p>
        </div>
      );
    }
  };

  const verifyUserInToTable = (data) => {
    const dataModalFilter = dataModal.map(({ email }) => email);

    if (dataModalFilter.includes(data.email)) {
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

      return (
        Toast.fire({
          icon: "error",
          title: "Este participante ya está dentro de la lista",
          background: "#000000",
          color: "#fff",
        }),
        setSearchByEmail(""),
        setListUsers(false)
      );
    } else {
      setSearchByEmail("");
      setListUsers(false);
      setDataModal([...dataModal, { ...data, porcentaje: 0 }]);
    }
  };

  const componentMenuUsers = useMemo(() => {
    if (listUsers) {
      return (
        <div className="w-full absolute bg-[#e6e6e6] p-5 max-h-52 flex flex-col gap-3 overflow-y-auto">
          {searchUser()}
        </div>
      );
    }
  }, [listUsers, searchByEmail]);

  const handleSubmit = (invoice) => {
    let newData = [...data];

    newData[invoice.index] = { ...newData[invoice.index], status: true };

    dispatch(getDigiPa(newData));
    dispatch(getDigiPoints(token, iduser));

    setSalesOption("salesRep");
    setNumModal(0);
    setOpened(false);
    setDataModal([]);
    setListUsers(false);
    setHover(false);
    setOpened(false);
  };

  const typeModal = useMemo(() => {
    if (numModal === 0) {
      return (
        <div className="flex flex-col gap-10">
          <h2 className="font-bold">Distribución de DigiPoints</h2>
          <p>Selecciona una opción para distribuir los DigiPoints</p>
          <select
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setSalesOption(e.target.value)}
          >
            <option value="salesRep">Representante de ventas</option>
            <option value="salesTeam">Equipo de ventas</option>
          </select>
          {salesOption === "salesTeam" && (
            <select
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              onChange={(e) => {
                const team = teams.find(
                  (data) => Number(e.target.value) === data.id
                );
                return setTeamInfo(team);
              }}
            >
              <option value="">Elije tu equipo de ventas</option>
              {teams.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.name_group}
                </option>
              ))}
            </select>
          )}
          <button className="btn btn-primary" onClick={() => nextModal()}>
            {t("tabla.continuar")}
          </button>
        </div>
      );
    }
    if (numModal === 1) {
      return (
        <PerUsers
          invoiceData={invoiceData}
          dataModal={dataModal}
          setDataModal={setDataModal}
          searchByEmail={searchByEmail}
          setSearchByEmail={setSearchByEmail}
          setListUsers={setListUsers}
          componentMenuUsers={componentMenuUsers}
          handleSubmit={handleSubmit}
          hover={hover}
        />
      );
    }
    if (numModal === 2) {
      return (
        <PerTeams
          invoiceData={invoiceData}
          teamInfo={teamInfo}
          handleSubmit={handleSubmit}
        />
      );
    }
  }, [
    numModal,
    salesOption,
    listUsers,
    searchByEmail,
    hover,
    dataModal,
    teamInfo,
  ]);

  const nextModal = () => {
    if (salesOption === "salesTeam") {
      setSalesOption("salesRep");
      return setNumModal(2);
    } else {
      setSalesOption("salesRep");
      return setNumModal(1);
    }
  };

  const handleUnassign = (obj) => {
    Swal.fire({
      title: "Antes de desasignar la factura, ¿quieres confirmar tu decisión?",
      showCancelButton: true,
      confirmButtonColor: "#eb1000",
      confirmButtonText: "Desasignar factura",
      denyCancelText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee-poits-collects/unassign-invoice`,
            {
              isGold: false,
              invoiceReference: obj.salesOrder,
            },
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            let newData = [...data];

            newData[obj.index] = {
              ...newData[obj.index],
              status: false,
            };

            dispatch(getDigiPoints(token, iduser));
            dispatch(getDigiPa(newData));
          });
      }

      return;
    });
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("es-GT", options);
  };

  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const [emailFilter, setEmailFilter] = useState("");
  const [reasonAssignFilter, setReasonAssignFilter] = useState("");

  const handleEmailFilterChange = (e) => {
    setEmailFilter(e.target.value);
  };

  const handleReasonAssignFilterChange = (e) => {
    setReasonAssignFilter(e.target.value);
  };

  const filteredUsers = data.filter((user) => {
    if (
      emailFilter &&
      !user.company_or_channel_name
        .toLowerCase()
        .includes(emailFilter.toLowerCase())
    ) {
      return false;
    }
    if (
      reasonAssignFilter &&
      !user.invoices_included
        .toString()
        .toLowerCase()
        .includes(reasonAssignFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setEmailFilter("");
    setReasonAssignFilter("");
  };

  const uniqueEmails = [
    ...new Set(data.map((user) => user.company_or_channel_name)),
  ];
  uniqueEmails.sort((a, b) => a?.localeCompare(b));

  const uniqueReasonAssign = [
    ...new Set(data.map((user) => user.invoices_included)),
  ];

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500 tableJustify overflow-hidden rounded-md">
          <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
            <tr>
              <th scope="col" className="py-3 px-6">
                {t("tabla.fecha")}
              </th>
              <th scope="col" className="py-3 px-6">
                {t("tabla.nfactura")}
              </th>
              <th scope="col" className="py-3 px-6">
                Organización
              </th>
              <th scope="col" className="py-3 px-6">
                Organización ID
              </th>
              <th scope="col" className="py-3 px-6">
                Digipoints
              </th>
              <th scope="col" className="py-3 px-6">
                Total Sales US
              </th>
              <th scope="col" className="py-3 px-6">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((obj, index) => (
                <tr
                  className={`${
                    (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                  } w-full`}
                  key={index}
                >
                  <td className="py-4 px-6">{formatDate(obj?.load_date)}</td>
                  <td className="py-4 px-6">{obj?.invoices_included}</td>
                  <td className="py-4 px-6">{obj?.company_or_channel_name}</td>
                  <td className="py-4 px-6">{obj?.company_or_channel_id}</td>
                  <td className="py-4 px-6">{obj?.digipoints_allocate}</td>
                  <td className="py-4 px-2">
                    ${parseFloat(obj?.invoice_amount).toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    {obj.status === false ? (
                      <span
                      /* className="btn btn-primary btn-xs"
                    onClick={() => {
                      setInvoiceData({ ...obj, index: index });
                      setOpened(true);
                    }} */
                      >
                        Sin asignar
                      </span>
                    ) : (
                      <span
                      /* className="btn btn-secondary btn-xs"
                    onClick={() =>
                      handleUnassign({ ...obj, index: index })
                    } */
                      >
                        Asignado
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;

    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, data, filteredUsers]);

  const pageCount = useMemo(
    () => Math.ceil(filteredUsers.length / itemsPerPage),
    [filteredUsers, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };
  const importFile = (data) => {
    // const workbook = XLSX.utils.book_new();
    // const sheet = XLSX.utils.json_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    // XLSX.writeFile(workbook, "Puntos_Por_Ventas.xlsx");

    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Puntos_por_ventas.csv");
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setSalesOption("salesRep");
          setNumModal(0);
          setOpened(false);
          setDataModal([]);
          setListUsers(false);
          setHover(false);
        }}
        size={numModal === 0 ? "40%" : "70%"}
        centered
      >
        {typeModal}
      </Modal>
      <div className="flex flex-col gap-6 mt-6">
        {!loading ? (
          <>
            <div className="w-full grid lg:grid-cols-3 gap-4 mb-4">
              <select
                value={emailFilter}
                onChange={handleEmailFilterChange}
                className="select select-bordered lg:w-3/4 w-full bg-[#F4F4F4]"
              >
                <option value="">{t("menu.Participantes")}</option>
                {uniqueEmails.map((email) => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </select>
              <select
                value={reasonAssignFilter}
                onChange={handleReasonAssignFilterChange}
                className="select select-bordered lg:w-3/4 w-full bg-[#F4F4F4]"
              >
                <option value="">Invoice</option>
                {uniqueReasonAssign.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              <div className="relative justify-items-center grid grid-flow-col">
                <button
                  className="font-bold !text-info cursor-pointer"
                  onClick={handleResetFilters}
                >
                  {t("tabla.limpiar")}
                </button>
                <button
                  className="font-bold !text-info cursor-pointer"
                  onClick={() => importFile(filteredUsers)}
                >
                  {t("tabla.exportar")}
                </button>
              </div>
            </div>
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
        ) : (
          <div className="lds-dual-ring"></div>
        )}
      </div>
    </>
  );
};

export default DigipointsAll;
