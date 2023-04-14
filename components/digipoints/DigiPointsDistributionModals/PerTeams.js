import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PerUser = ({ invoiceData, teamInfo, handleSubmit }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const company = useSelector((state) => state.user.company);
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const [thisTeam, setThisTeam] = useState({});

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
    setLoading(true);

    axios
      .get(
        `${process.env.BACKURL}/partner-admin-group-headers/${teamInfo.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setThisTeam(res.data);
        setLoading(false);
      });
  }, []);

  const handleAsign = () => {
    axios
      .post(
        `${process.env.BACKURL}/employee-poits-collects/assign-points/`,
        {
          partnerAdminId: user.id,
          assignType: "group",
          isGold: false,
          assignValues: [
            {
              groupId: thisTeam.id,
              invoiceId: invoiceData.invoices_included.toString(),
              digiPoints: Number(invoiceData.digipoints),
            },
          ],
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
        handleSubmit(invoiceData);
        return Toast.fire({
          icon: "success",
          title: t("digipoints.successFact"),
        });
      });
  };

  if (loading) {
    return <div className="lds-dual-ring"></div>;
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex justify-between relative px-10 w-full">
        <div className="flex flex-col gap-5 w-full">
          <p>{t("digipoints.detallesFactura")}</p>
          <div className="grid grid-cols-4 text-sm">
            <div className="border-2 p-3">
              <p className="text-primary">{t("digipoints.NoFactura")}:</p>
              <p>{invoiceData.invoices_included}</p>
            </div>
            <div className="border-2 p-3">
              <p className="text-primary">{t("tabla.fecha")}:</p>
              <p>{invoiceData.date}</p>
            </div>
            <div className="border-2  p-3">
              <p className="text-primary">Cliente:</p>
              <p>{invoiceData.client}</p>
            </div>
            <div className="border-2 p-3">
              <p className="text-primary">{t("tabla.cantidad")}:</p>
              <p>{invoiceData.salesQuantity}</p>
            </div>
            <div className="border-2 p-3 col-span-4 flex flex-col justify-evenly">
              <p className="text-primary ">DigiPoints:</p>
              <p className="text-center font-bold text-2xl">
                {invoiceData.digipoints}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 w-full">
        <div className="text-xs text-black-500 uppercase border-2 w-full grid grid-cols-3 place-items-center tableHeader">
          <p scope="col" className="py-3 px-6">
            {t("tabla.nombre")}
          </p>
          <p scope="col" className="py-3 px-6">
            {t("tabla.correo")}
          </p>
          <p scope="col" className="py-3 px-6">
            Digipoints
          </p>
        </div>
        <div className="w-full overflow-y-scroll">
          <table className="border-2 w-full text-sm">
            <tbody>
              {thisTeam?.PartnerAdminGroupD?.map((data) => (
                <tr
                  className="bg-white border-b dark:border-gray-500"
                  key={data.id}
                >
                  <td className="py-[1.1rem] w-1/3">{data.member.name}</td>
                  <td>{data.member.email}</td>
                  <td className="w-1/3">
                    {Math.round(
                      invoiceData.digipoints * (data.percentage / 100)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary w-max" onClick={handleAsign}>
        {t("tabla.asignar")}
      </button>
    </div>
  );
};

export default PerUser;
