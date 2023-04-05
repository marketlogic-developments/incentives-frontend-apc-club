import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PerUsers = ({
  invoiceData,
  dataModal,
  setDataModal,
  searchByEmail,
  setSearchByEmail,
  setListUsers,
  componentMenuUsers,
  handleSubmit,
  hover,
}) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

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

  const handleAsign = () => {
    const usersAsign = dataModal.map((data) => ({
      invoiceId: invoiceData.invoices_included.toString(),
      vendorId: data.id,
      digiPoints: Number(invoiceData.digipoints) / dataModal.length,
    }));

    //Test to change invoices

    if (Cookies.get("invoices") === undefined) {
      Cookies.set(
        "invoices",
        JSON.stringify([{ ...invoiceData, status: true }])
      );
    } else {
      const prevCookies = JSON.parse(Cookies.get("invoices"));

      Cookies.set(
        "invoices",
        JSON.stringify([...prevCookies, { ...invoiceData, status: true }])
      );
    }

    axios
      .post(
        `${process.env.BACKURL}/employee-poits-collects/assign-points/`,
        {
          partnerAdminId: user.id,
          assignType: "amount",
          assignValues: usersAsign,
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
        handleSubmit({ ...invoiceData, status: true });
        return Toast.fire({
          icon: "success",
          title: "Tu factura fue asignada de manera exitosa",
        });
      });
  };

  return (
    <div className="grid grid-cols-2 h-[500px]">
      <div className="flex flex-col justify-between relative px-10">
        <div className="flex flex-col gap-5">
          <p>Detalles de la factura</p>
          <div className="grid grid-cols-4 text-sm">
            <div className="border-2 p-3">
              <p className="text-primary">No. Factura:</p>
              <p>{invoiceData.invoices_included}</p>
            </div>
            <div className="border-2 p-3">
              <p className="text-primary">Fecha:</p>
              <p>{invoiceData.date}</p>
            </div>

            <div className="border-2  p-3">
              <p className="text-primary">Cliente:</p>
              <p>{invoiceData.client}</p>
            </div>
            <div className="border-2 p-3">
              <p className="text-primary">Cantidad:</p>
              <p>{invoiceData.salesQuantity}</p>
            </div>
            <div className="border-2 p-3 col-span-2 flex flex-col justify-evenly">
              <p className="text-primary ">DigiPoints Disponibles:</p>
              <p className="text-center font-bold text-2xl">
                {invoiceData.digipoints}
              </p>
            </div>
            <div className="border-2 p-3 col-span-2 flex flex-col justify-evenly">
              <p className="text-primary">
                DigiPoints estimados por Representante de ventas:
              </p>
              <p className="text-center font-bold text-2xl">
                {dataModal.length === 0
                  ? 0
                  : Math.floor(invoiceData.digipoints / dataModal.length)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p>Asignar Representante de Ventas</p>
          <div className="relative w-full">
            <input
              value={searchByEmail}
              className="input input-primary w-full"
              type="text"
              placeholder="Buscar por email"
              onChange={(e) => setSearchByEmail(e.target.value)}
              onFocus={() => setListUsers(true)}
              onBlur={() => {
                if (hover === false) {
                  return setListUsers(false);
                }
              }}
              autoComplete="off"
            />
            {componentMenuUsers}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-max"
            onClick={handleAsign}
          >
            Asignar
          </button>
        </div>
      </div>
      <div>
        <div className="text-xs text-black-500 uppercase border-2 w-full grid grid-cols-3 place-items-center tableHeader">
          <p scope="col" className="py-3 px-6">
            Nombre
          </p>
          <p scope="col" className="py-3 px-6">
            Email
          </p>
          <p scope="col" className="py-3 px-6">
            Quitar
          </p>
        </div>
        <div className="w-full overflow-y-scroll">
          <table className="border-2 w-full text-sm">
            {dataModal?.map((data) => (
              <tr
                className="bg-white border-b dark:border-gray-500"
                key={data.id}
              >
                <td className="py-[1.1rem] w-1/3">{data.name}</td>
                <td>{data.email}</td>
                <td
                  className="w-1/3"
                  onClick={() => {
                    const usersDelete = dataModal.filter(
                      ({ id }) => id !== data.id
                    );
                    setDataModal(usersDelete);
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    fill="#eb1000"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full cursor-pointer"
                  >
                    <path d="M20.25 4.5H16.5v-.75a2.26 2.26 0 0 0-2.25-2.25h-4.5A2.26 2.26 0 0 0 7.5 3.75v.75H3.75a.75.75 0 0 0 0 1.5h.75v13.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 1 0 0-1.5ZM10.5 15.75a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0v6Zm4.5 0a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0v6ZM15 4.5H9v-.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75v.75Z"></path>
                  </svg>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerUsers;
