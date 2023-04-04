import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PerUser = ({ invoiceData, teamInfo, handleSubmit }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [thisTeam, setThisTeam] = useState({});

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
    axios.post();

    console.log({
      partnerAdminId: user.id,
      assignType: "group",
      assignValues: [
        {
          groupId: thisTeam.id,
          invoiceId: invoiceData.invoices_included.toString(),
          digiPoints: Number(invoiceData.digipoints),
        },
      ],
    });

    handleSubmit();
  };

  if (loading) {
    return <div className="lds-dual-ring"></div>;
  }

  console.log(invoiceData, thisTeam);

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex justify-between relative px-10 w-full">
        <div className="flex flex-col gap-5 w-full">
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
            <div className="border-2 p-3 col-span-4 flex flex-col justify-evenly">
              <p className="text-primary ">DigiPoints Disponibles:</p>
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
            Nombre
          </p>
          <p scope="col" className="py-3 px-6">
            Email
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
        Asignar
      </button>
    </div>
  );
};

export default PerUser;
