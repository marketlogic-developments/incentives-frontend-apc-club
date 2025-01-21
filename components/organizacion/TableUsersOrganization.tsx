import React, { useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ButtonAddUser from "./ButtonAddUser";
import { Menu } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { RootState } from "store/store";
import { ListUser } from "functions/User/ListUser";
import { CurrentUser } from "services/User/user.service";
import DataNotFound from "components/Module/404/DataNotFound";
import { setLoading } from "store/reducers/users.reducer";

const TableUsersOrganization = () => {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.currentUser);
  const { allUsers, loading } = useSelector((state: RootState) => state.user);
  const { ListAllUsers } = ListUser();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
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

  //Llama a un endpoint diferente si el usuario que hace el get pertenece a un distribuidor o a un canal

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

  const actionsUsers = (action: number, id: any) => {
    if (action === 1) {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
          {
            operationStatusId: 5,
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
          return Toast.fire({
            icon: "success",
            title: "El usuario ha sido desactivado",
            background: "#000000",
            color: "#fff",
          });
        });
    }
    if (action === 2) {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
          {
            operationStatusId: 4,
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
          return Toast.fire({
            icon: "success",
            title: "El usuario ha sido activado",
            background: "#000000",
            color: "#fff",
          });
        });
    }

    if (action === 3) {
      console.log("a");
    }
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
        className={`${(index + 1) % 2 === 0 && "bg-[#F5F5F5]"} w-full`}
        key={item.id}
      >
        <td className="py-3 px-6">{`${item?.profile?.first_name || "No Name"} ${
          item?.profile?.last_name
        }`}</td>
        <td className="py-3 px-6">{item?.region?.name || "NONE"}</td>
        {/* {company?.country && (
          <td className="py-3 px-6">{company.country}</td>
        )} */}
        <td className="py-3 px-6">{item?.email}</td>
        <td className="py-3 !pl-10 pr-6">
          {item?.roles[0]?.name === "administrador"
            ? "Super Admin" :
          item?.roles[0]?.name === "partner_principal"
            ? "Partner Principal"
            : item?.roles[0]?.name === "partner_admin"
            ? "Partner Admin"
            : item?.roles[0]?.name === "sales_rep"
            ? "Sales Rep"
            : undefined}
        </td>
        <td className="py-3 px-6">{item?.is_active ? "Activo" : "Inactivo"}</td>
        <td>
          <Menu position="bottom-end">
            <Menu.Target>
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-auto"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0938 14.625C10.0938 15.0726 9.92584 15.5018 9.62695 15.8182C9.32807 16.1347 8.92269 16.3125 8.5 16.3125C8.07731 16.3125 7.67193 16.1347 7.37305 15.8182C7.07416 15.5018 6.90625 15.0726 6.90625 14.625C6.90625 14.1774 7.07416 13.7482 7.37305 13.4318C7.67193 13.1153 8.07731 12.9375 8.5 12.9375C8.92269 12.9375 9.32807 13.1153 9.62695 13.4318C9.92584 13.7482 10.0938 14.1774 10.0938 14.625ZM10.0938 9C10.0938 9.44755 9.92584 9.87678 9.62695 10.1932C9.32807 10.5097 8.92269 10.6875 8.5 10.6875C8.07731 10.6875 7.67193 10.5097 7.37305 10.1932C7.07416 9.87678 6.90625 9.44755 6.90625 9C6.90625 8.55245 7.07416 8.12322 7.37305 7.80676C7.67193 7.49029 8.07731 7.3125 8.5 7.3125C8.92269 7.3125 9.32807 7.49029 9.62695 7.80676C9.92584 8.12322 10.0938 8.55245 10.0938 9ZM10.0938 3.375C10.0938 3.82255 9.92584 4.25178 9.62695 4.56824C9.32807 4.88471 8.92269 5.0625 8.5 5.0625C8.07731 5.0625 7.67193 4.88471 7.37305 4.56824C7.07416 4.25178 6.90625 3.82255 6.90625 3.375C6.90625 2.92745 7.07416 2.49822 7.37305 2.18176C7.67193 1.86529 8.07731 1.6875 8.5 1.6875C8.92269 1.6875 9.32807 1.86529 9.62695 2.18176C9.92584 2.49822 10.0938 2.92745 10.0938 3.375Z"
                  fill="#6F6F6F"
                />
              </svg>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => actionsUsers(1, item.id)}>
                <div className="flex gap-6 items-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.7631 2.2881C19.7003 2.21911 19.6242 2.16356 19.5393 2.12482C19.4545 2.08608 19.3626 2.06495 19.2694 2.0627C19.1761 2.06045 19.0834 2.07713 18.9967 2.11174C18.9101 2.14634 18.8314 2.19815 18.7654 2.26404L18.2338 2.79298C18.1694 2.85744 18.1332 2.94484 18.1332 3.03597C18.1332 3.1271 18.1694 3.2145 18.2338 3.27896L18.7211 3.76536C18.753 3.79745 18.791 3.82292 18.8328 3.84029C18.8746 3.85767 18.9195 3.86661 18.9647 3.86661C19.01 3.86661 19.0548 3.85767 19.0967 3.84029C19.1385 3.82292 19.1764 3.79745 19.2084 3.76536L19.7266 3.24974C19.9887 2.98806 20.0132 2.56181 19.7631 2.2881ZM17.1592 3.8672L9.40247 11.6102C9.35545 11.657 9.32126 11.7152 9.30322 11.779L8.94443 12.8477C8.93583 12.8767 8.93522 12.9074 8.94267 12.9368C8.95011 12.9661 8.96532 12.9928 8.98671 13.0142C9.00809 13.0356 9.03485 13.0508 9.06417 13.0583C9.09348 13.0657 9.12426 13.0651 9.15326 13.0565L10.221 12.6977C10.2849 12.6797 10.3431 12.6455 10.3899 12.5984L18.1329 4.84087C18.2045 4.76847 18.2447 4.67073 18.2447 4.56888C18.2447 4.46703 18.2045 4.36929 18.1329 4.29689L17.7053 3.8672C17.6328 3.79491 17.5346 3.75432 17.4323 3.75432C17.3299 3.75432 17.2317 3.79491 17.1592 3.8672Z"
                      fill="#EB1000"
                    />
                    <path
                      d="M16.6005 8.32133L11.3631 13.5691C11.1607 13.772 10.9119 13.9226 10.6382 14.0078L9.52531 14.3804C9.2612 14.4549 8.98197 14.4578 8.7164 14.3885C8.45084 14.3193 8.20854 14.1804 8.01448 13.9864C7.82042 13.7923 7.68161 13.55 7.61236 13.2845C7.54311 13.0189 7.54592 12.7397 7.62051 12.4755L7.99305 11.3627C8.07801 11.0891 8.22829 10.8403 8.4309 10.6378L13.6787 5.39945C13.7268 5.3514 13.7595 5.29017 13.7728 5.22349C13.7861 5.15682 13.7794 5.08769 13.7534 5.02486C13.7274 4.96204 13.6834 4.90833 13.6269 4.87053C13.5703 4.83272 13.5039 4.81253 13.4359 4.8125H4.46875C3.83057 4.8125 3.21853 5.06602 2.76727 5.51727C2.31602 5.96853 2.0625 6.58057 2.0625 7.21875V17.5312C2.0625 18.1694 2.31602 18.7815 2.76727 19.2327C3.21853 19.684 3.83057 19.9375 4.46875 19.9375H14.7812C15.4194 19.9375 16.0315 19.684 16.4827 19.2327C16.934 18.7815 17.1875 18.1694 17.1875 17.5312V8.5641C17.1875 8.49611 17.1673 8.42966 17.1295 8.37314C17.0917 8.31663 17.038 8.2726 16.9751 8.24661C16.9123 8.22062 16.8432 8.21385 16.7765 8.22715C16.7098 8.24045 16.6486 8.27323 16.6005 8.32133Z"
                      fill="#EB1000"
                    />
                  </svg>
                  <p className="text-[#eb1000]">Desactivar</p>
                </div>
              </Menu.Item>
              {/* <Menu.Item onClick={() => console.log("a")}>
                <div className="flex gap-6">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_157_770)">
                      <path
                        d="M6.14705 6.5C6.29526 6.5 6.4374 6.55888 6.5422 6.66368C6.647 6.76848 6.70587 6.91061 6.70587 7.05882V13.7647C6.70587 13.9129 6.647 14.0551 6.5422 14.1599C6.4374 14.2647 6.29526 14.3235 6.14705 14.3235C5.99884 14.3235 5.8567 14.2647 5.7519 14.1599C5.6471 14.0551 5.58823 13.9129 5.58823 13.7647V7.05882C5.58823 6.91061 5.6471 6.76848 5.7519 6.66368C5.8567 6.55888 5.99884 6.5 6.14705 6.5ZM8.94117 6.5C9.08938 6.5 9.23152 6.55888 9.33632 6.66368C9.44112 6.76848 9.49999 6.91061 9.49999 7.05882V13.7647C9.49999 13.9129 9.44112 14.0551 9.33632 14.1599C9.23152 14.2647 9.08938 14.3235 8.94117 14.3235C8.79296 14.3235 8.65082 14.2647 8.54602 14.1599C8.44122 14.0551 8.38234 13.9129 8.38234 13.7647V7.05882C8.38234 6.91061 8.44122 6.76848 8.54602 6.66368C8.65082 6.55888 8.79296 6.5 8.94117 6.5ZM12.2941 7.05882C12.2941 6.91061 12.2352 6.76848 12.1304 6.66368C12.0256 6.55888 11.8835 6.5 11.7353 6.5C11.5871 6.5 11.4449 6.55888 11.3401 6.66368C11.2353 6.76848 11.1765 6.91061 11.1765 7.05882V13.7647C11.1765 13.9129 11.2353 14.0551 11.3401 14.1599C11.4449 14.2647 11.5871 14.3235 11.7353 14.3235C11.8835 14.3235 12.0256 14.2647 12.1304 14.1599C12.2352 14.0551 12.2941 13.9129 12.2941 13.7647V7.05882Z"
                        fill="#3D4D5A"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.2059 3.70588C16.2059 4.0023 16.0881 4.28657 15.8785 4.49617C15.6689 4.70577 15.3847 4.82352 15.0882 4.82352H14.5294V14.8823C14.5294 15.4752 14.2939 16.0437 13.8747 16.4629C13.4555 16.8821 12.887 17.1176 12.2941 17.1176H5.58825C4.99541 17.1176 4.42686 16.8821 4.00766 16.4629C3.58846 16.0437 3.35295 15.4752 3.35295 14.8823V4.82352H2.79413C2.49771 4.82352 2.21343 4.70577 2.00383 4.49617C1.79423 4.28657 1.67648 4.0023 1.67648 3.70588V2.58823C1.67648 2.29181 1.79423 2.00753 2.00383 1.79793C2.21343 1.58833 2.49771 1.47058 2.79413 1.47058H6.70589C6.70589 1.17416 6.82365 0.889886 7.03325 0.680287C7.24285 0.470688 7.52712 0.352936 7.82354 0.352936L10.0588 0.352936C10.3553 0.352936 10.6395 0.470688 10.8491 0.680287C11.0587 0.889886 11.1765 1.17416 11.1765 1.47058H15.0882C15.3847 1.47058 15.6689 1.58833 15.8785 1.79793C16.0881 2.00753 16.2059 2.29181 16.2059 2.58823V3.70588ZM4.60248 4.82352L4.4706 4.88947V14.8823C4.4706 15.1788 4.58835 15.463 4.79795 15.6726C5.00755 15.8822 5.29183 16 5.58825 16H12.2941C12.5905 16 12.8748 15.8822 13.0844 15.6726C13.294 15.463 13.4118 15.1788 13.4118 14.8823V4.88947L13.2799 4.82352H4.60248ZM2.79413 3.70588V2.58823H15.0882V3.70588H2.79413Z"
                        fill="#3D4D5A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_157_770">
                        <rect
                          width="17.8824"
                          height="17.8824"
                          fill="white"
                          transform="translate(0 0.352905)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="text-black">
                    {t("digipoints.delete")}
                  </p>
                </div>
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));
  }, [loading, allUsers]);

  return (
    <div className="flex flex-col gap-6 mt-16">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center lg:gap-0 gap-3">
        <div>
          <p className="font-bold !text-xl">{t("Reportes.usuarios")}</p>
        </div>
        <div className="flex gap-6 lg:w-2/4 w-full">
          <div className="relative flex w-full">
            <input
              className="input input-bordered h-auto pl-8 py-2 text-sm font-normal w-full rounded-full bg-[]"
              placeholder={String(t("tabla.buscar"))}
              type="text"
              onChange={(e) =>
                setParams((prev) => ({ ...prev, search: e.target.value }))
              }
            />
            <div className="absolute h-full items-center flex ml-2">
              <AiOutlineSearch color="#eb1000" />
            </div>
          </div>
          <ButtonAddUser />
        </div>
      </div>
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-black-500 tableJustify overflow-hidden rounded-md">
            <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
              <th scope="col" className="py-5 px-6">
                {t("tabla.nombre")}
              </th>
              <th scope="col" className="py-5 px-6">
                {t("tabla.region")}
              </th>
              {/* {company?.country && (
                <th scope="col" className="py-5 px-6">
                  País
                </th>
              )} */}
              <th scope="col" className="py-5 px-6">
                Email
              </th>
              <th scope="col" className="py-5 !pl-10">
                Rol
              </th>
              <th scope="col" className="py-5 px-6">
                Estado
              </th>
              <th scope="col" className="py-5 px-6"></th>
            </thead>
            <tbody>{RenderTable}</tbody>
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
        nextLabel={<FaChevronRight style={{ color: "#000", fontSize: "20" }} />}
        previousLabel={
          <FaChevronLeft style={{ color: "#000", fontSize: "20" }} />
        }
      />
    </div>
  );
};

export default TableUsersOrganization;
