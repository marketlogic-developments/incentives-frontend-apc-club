import axios from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../../../store/reducers/teams.reducer";
import Swal from "sweetalert2";
import { Triangle } from "react-loader-spinner";
import { TeamsFunction } from "functions/Teams/TeamsFunction";
import DataNotFound from "components/Module/404/DataNotFound";
import { Team } from "services/Teams/team.service";
import { RootState } from "store/store";
import { InvoicesFunction } from "functions/Invoices/InvoicesFunction";
import { AssingInvoice } from "services/Invoices/invoices.service";
import { setDigipoints } from "store/reducers/currentUser.reducer";

interface Props {
  invoiceData: AssingInvoice;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const PerTeams: FC<Props> = ({ invoiceData, setOpened }) => {
  const { digipoints } = useSelector((state: RootState) => state.currentUser);
  const teams = useSelector((state: RootState) => state.teams.teams);
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const [searchByName, setSearchByName] = useState<string>("");
  const [thisTeam, setThisTeam] = useState<Team | null>(null);
  const { ListAllTeams } = TeamsFunction();
  const { AssignInvoice } = InvoicesFunction();
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
    ListAllTeams();
  }, []);

  const handleAssign = () => {
    setLoading(true);
    if (!thisTeam?.id) {
      return Toast.fire({
        icon: "error",
        title: String(t("digipoints.errorNoTeam")),
      });
    }

    AssignInvoice({
      assignment_type: "TEAM",
      invoice_point_id: invoiceData.id,
      user_or_team_id: thisTeam.id,
    })
      .then(() => {
        dispatch(setDigipoints({...digipoints, current_points: digipoints.current_points + calculatePorcentage()}))
        setOpened(false);
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
        {/* <div className="grid grid-cols-2 gap-6">
          <p className="font-bold !text-base self-center">
            {t("digipoints.teamV")} ({teams?.content.length ?? 0})
          </p>
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
              placeholder={String(t("tabla.buscar"))}
              type="text"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            <div className="absolute h-full items-center flex ml-2">
              <AiOutlineSearch color="#eb1000" />
            </div>
          </div>
          <p className="col-span-2">{t("digipoints.selectTeam")}</p>
        </div> */}
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
              {teams ? (
                <tbody className="min-h-[15rem]">
                  {teams.content
                    .filter((item) => {
                      if (searchByName !== "") {
                        return item.name.startsWith(
                          searchByName.toLocaleLowerCase()
                        );
                      }

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
                              onChange={() => setThisTeam(item)}
                            ></input>

                            {item.name}
                          </div>
                        </td>
                        <td className="py-3">{item.users_teams.length}</td>
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

export default PerTeams;
