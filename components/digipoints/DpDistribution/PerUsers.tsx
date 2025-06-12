import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Triangle } from "react-loader-spinner";
import { CurrentUser } from "services/User/user.service";
import { InvoicesFunction } from "functions/Invoices/InvoicesFunction";
import { RootState } from "store/store";
import { AssingInvoice } from "services/Invoices/invoices.service";
import { ListUser } from "functions/User/ListUser";
import DataNotFound from "components/Module/404/DataNotFound";
import { setDigipoints } from "store/reducers/currentUser.reducer";

interface Props {
  invoiceData: AssingInvoice;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const PerUsers: FC<Props> = ({ invoiceData, setOpened }) => {
  const [searchByEmail, setSearchByEmail] = useState("");
  const { digipoints } = useSelector((state: RootState) => state.currentUser);
  const usersCompany = useSelector((state: RootState) => state.user.allUsers);
  const [t, i18n] = useTranslation("global");
  const [thisUser, setThisUser] = useState<CurrentUser | null>(null);
  const dispatch=useDispatch()
  const { AssignInvoice } = InvoicesFunction();
  const { ListAllUsers } = ListUser();
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
  console.log(usersCompany)

  useEffect(() => {
    ListAllUsers("limit=100");
  }, []);

  const handleAssign = () => {
    setLoading(true);

    if (!thisUser?.id) {
      return Toast.fire({
        icon: "error",
        title: String(t("digipoints.errorNoTeam")),
      });
    }

    AssignInvoice({
      assignment_type: "INDIVIDUAL",
      invoice_point_id: invoiceData.id,
      user_or_team_id: thisUser.id,
    })
      .then(() => {
        dispatch(setDigipoints({...digipoints, current_points: digipoints.current_points + calculatePorcentage()}))
        setOpened(false);
        setLoading(false);
        return Toast.fire({
          icon: "success",
          title: String(t("digipoints.successFact")),
        });
      })
      .finally(() => setLoading(false));
  };

  const calculatePorcentage=():number=>{
    const value= Math.floor(invoiceData.points * 0.1)

    return value
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <p className="font-bold !text-base self-center">
            {t("digipoints.represV")} ({usersCompany?.content.length})
          </p>
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full"
              placeholder={String(t("tabla.buscar"))}
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
              {usersCompany ? (
                <tbody className="min-h-[15rem]">
                  {usersCompany?.content
                    .filter((item) => {
                      if (searchByEmail !== "") {
                        return item.email.startsWith(
                          searchByEmail.toLocaleLowerCase()
                        );
                        // &&
                        // item.roles[0].name === "sales_rep"
                      }

                      // return item && item.roles[0].name === "sales_rep";

                      return item;
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
                              name="salesTeam"
                              onChange={() => setThisUser(item)}
                            ></input>
                            {item?.profile?.first_name}
                          </div>
                        </td>
                        <td className="py-3">{item.email}</td>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-10 text-gray-500">
                    <DataNotFound action={() => console.log("a")} />
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="relative w-full flex lg:flex-row flex-col-reverse justify-center justify-around mt-auto mb-6 gap-4 lg:gap-0">
        <button
          type="reset"
          className="btn btn-cancel lg:w-48 w-full"
          onClick={() => {
            setOpened(false);
          }}
        >
          {t("modalEquipos.cancelar")}
        </button>
        <button
          className="btn btn-info lg:w-48 w-full"
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
