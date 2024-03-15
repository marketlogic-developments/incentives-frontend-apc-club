import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setCompanyUsers } from "../../../store/reducers/users.reducer";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

const PerUsers = ({ invoiceData, handleSubmit, setOpened }) => {
  const [searchByEmail, setSearchByEmail] = useState("");
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const usersCompany = useSelector((state) => state.user.companyUsers);
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const [thisUser, setThisUser] = useState("");
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const compOrDist =
      user.company === null
        ? {
            endpoint: "distri-all-users-by-id",
            byId: user.distributionChannelId,
          }
        : { endpoint: "company-all-users-by-id", byId: user.companyId };

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/${compOrDist.endpoint}/${compOrDist.byId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(setCompanyUsers(data));
      });
  }, [token]);

  const handleAssign = () => {
    setLoading(true);

    if (!thisUser.id) {
      return Toast.fire({
        icon: "error",
        title: t("digipoints.errorNoTeam"),
      });
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee-poits-collects/assign-points/`,
        {
          partnerAdminId: user.id,
          assignType: "amount",
          isGold: user.companyId === null ? true : false,
          assignValues: [
            {
              invoiceId: invoiceData.invoices_included.toString(),
              vendorId: thisUser.id,
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
      .then((res) => {
        handleSubmit(invoiceData);
        return Toast.fire({
          icon: "success",
          title: t("digipoints.successFact"),
        });
      })
      .catch((e) => {
        return Toast.fire({
          icon: "error",
          title: "An error has occurred",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <p className="font-bold !text-base self-center">
            {t("digipoints.represV")} ({usersCompany.length})
          </p>
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
              placeholder={t("tabla.buscar")}
              type="text"
              value={searchByEmail}
              onChange={(e) => setSearchByEmail(e.target.value)}
            />
            <div className="absolute h-full items-center flex ml-2">
              <AiOutlineSearch color="#eb1000" />
            </div>
          </div>
          <p className="col-span-2">{t("digipoints.selectUser")}</p>
        </div>
        <div className="w-full">
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm text-left text-black-500 tableJustify table-fixed overflow-hidden"
              style={{ borderRadius: "10px" }}
            >
              <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-1 ">
                <th scope="col" className="py-5 px-6">
                  {t("tabla.nEquipo")}
                </th>
                <th scope="col" className="py-5 px-6">
                  {t("tabla.nParticipantes")}
                </th>
              </thead>
              {usersCompany.length !== 0 && (
                <tbody className="min-h-[15rem]">
                  {usersCompany
                    .filter((item) => {
                      if (searchByEmail !== "") {
                        return (
                          item.email.startsWith(
                            searchByEmail.toLocaleLowerCase()
                          ) && item.role_id === 5
                        );
                      }

                      return item && item.role_id === 5;
                    })
                    .map((item, index) => (
                      <tr
                        className={
                          index % 2 !== 0 ? "bg-[#F5F5F5]" : "bg-white"
                        }
                      >
                        <td className="py-3">
                          <div className="flex gap-6 items-center">
                            <input
                              className="radio radio-xs checked:bg-blue-500"
                              type="radio"
                              value={item}
                              name="salesTeam"
                              onChange={() => setThisUser(item)}
                            ></input>

                            {item.name}
                          </div>
                        </td>
                        <td className="py-3">{item.email}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="relative w-full flex lg:flex-row flex-col-reverse justify-center justify-around mt-auto mb-6 gap-4 lg:gap-0">
        <button
          type="cancel"
          className="btn btn-cancel lg:w-48 w-full"
          onClick={() => {
            setOpened(false);
          }}
        >
          {t("modalEquipos.cancelar")}
        </button>
        <button
          className="btn btn-cancel lg:w-48 w-full"
          onClick={handleAssign}
          disabled={loading}
        >
          {loading ? (
            <Triangle
              height="30"
              width="30"
              color="#ffff"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            t("digipoints.cAsignacion")
          )}
        </button>
      </div>
    </>
  );
};

export default PerUsers;
