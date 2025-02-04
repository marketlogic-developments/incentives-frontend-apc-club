import { Modal } from "@mantine/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMemo } from "react";
import Swal from "sweetalert2";
import { setLoading } from "store/reducers/users.reducer";
import { ListUser } from "functions/User/ListUser";
import { RootState } from "store/store";
import { CurrentUser } from "services/User/user.service";
import DataNotFound from "components/Module/404/DataNotFound";
import { useDataUser } from "functions/SetDataUser";
import { NotiSwal } from "notifications/notifications";

interface Props{
  opened:boolean,
  setOpened: Dispatch<SetStateAction<boolean>>
}

const ModalSwitchUser:FC<Props> = ({ opened, setOpened }) => {
  const [t, i18n] = useTranslation("global");
   const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.currentUser);
    const { allUsers, loading } = useSelector((state: RootState) => state.user);
    const { ListAllUsers } = ListUser();
    const { switchUser } = useDataUser();
    const [params, setParams] = useState({
      page: 1,
      limit: 10,
      search: "",
    });


    useEffect(() => {
      const { limit, page, search } = params;
      dispatch(setLoading(true));
      ListAllUsers(`page=${page}&limit=${limit}&search=${search}&search_fields=email`).finally(() =>
        dispatch(setLoading(false))
      );
    }, [params]);
  
    const handlePageClick = (e: { selected: number }) => {
      setParams((prev) => ({ ...prev, page: e.selected + 1 }));
    };


  const handleSubmit = (dataUserSwitch:CurrentUser) => {
    switchUser(dataUserSwitch.email).then((res)=>{
      let timerInterval;
      Swal.fire({
        title: `You will be redirected to the user ${dataUserSwitch.email} `,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          return window.location.replace("/dashboard");
        }
      });
    }).catch(()=>{
      NotiSwal({text:"Error to Switch User, try again later"})
    })

  
  };

  const RenderTable = useMemo(() => {
    if (!allUsers) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-10 text-gray-500">
            <DataNotFound
              action={() => {
                const { limit, page, search } = params;
                ListAllUsers(`page=${page}&limit=${limit}&search=${search}`);
              }}
            />
          </td>
        </tr>
      );
    }

    if (loading) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-10 text-gray-500">
            <div className="lds-dual-ring"></div>
          </td>
        </tr>
      );
    }

    return allUsers?.content?.map((item: CurrentUser, index: number) => (
      <tr
                      className={`${
                        (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                      } w-full`}
                      key={item.id}
                    >
                      <td className="py-3 px-6">{`${item?.profile?.first_name} ${item?.profile?.last_name}`}</td>
                      <td className="py-3 px-6">{item.email}</td>
                      <td className="py-3 px-6">{item?.region?.name || "NONE"}</td>
                      <td className="py-3 px-6">
                        {item?.roles[0]?.name === "sales_rep"
                          ? "Sales Rep"
                          : item?.roles[0]?.name === "partner_admin"
                          ? "Partner Admin" :
                           item?.roles[0]?.name === "partner_principal"? "Partner Principal" : undefined}
                      </td>
                      <td className="py-3 px-6">{item?.profile?.organizations[0]?.name || undefined}</td>
                      <td className="py-3 px-6">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleSubmit(item)}
                        >
                          Switch
                        </button>
                      </td>
                    </tr>
    ));
  }, [loading, allUsers]);

  return (
    <>
      <Modal
        centered
        size="100%"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full justify-center">
            <p className="text-3xl font-bold text-center">Switch User</p>
          </div>
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
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder={String(t("tabla.buscarEmail"))}
                className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-black-500 tableJustify overflow-hidden rounded-md">
                <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
                  <th scope="col" className="py-5 px-6">
                    Nombre
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Region
                  </th>
                  <th scope="col" className="py-5 !pl-10">
                    Rol
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Compañía
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Switch
                  </th>
                </thead>
                <tbody>
                  {RenderTable}
                </tbody>
              </table>
            </div>
          </div>
          <ReactPaginate
            pageCount={allUsers?.total_pages ?? 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
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
        </div>
      </Modal>
      <div>
        <button
          className="btn btn-sm w-full !btn-outline btn-info"
          onClick={() => {
            setOpened(true);
          }}
        >
          Switch
        </button>
      </div>
    </>
  );
};

export default ModalSwitchUser;
