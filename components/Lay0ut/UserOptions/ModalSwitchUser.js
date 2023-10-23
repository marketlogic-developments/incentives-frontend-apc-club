import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../../../store/reducers/users.reducer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMemo } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ModalSwitchUser = ({ opened, setOpened }) => {
  const [t, i18n] = useTranslation("global");
  const token = useSelector((state) => state.user.token);
  const itemsPerPage = 10;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const users = useSelector((state) => state.user.users).filter(
    ({ operationStatusId, roleId }) => operationStatusId !== 5 && roleId !== 1
  );
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return users
      .filter((data) => {
        if (search !== "") {
          return data.email.startsWith(search.toLocaleLowerCase());
        }

        return data;
      })
      .slice(itemOffset, endOffset);
  }, [itemOffset, users, search]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  const pageCount = useMemo(
    () =>
      Math.ceil(
        users.filter((data) => {
          if (search !== "") {
            return data.email.startsWith(search.toLocaleLowerCase());
          }

          return data;
        }).length / itemsPerPage
      ),
    [itemsPerPage, users, search]
  );

  const companyIdentify = (data) => {
    if (data.companyId) {
      return data.company?.name;
    }

    if (data.distributionChannelId) {
      return data.distributionChannel.nameDist;
    }

    return "Null";
  };

  const handleSubmit = (dataUserSwitch) => {
    window.sessionStorage.setItem(
      "infoDt",
      JSON.stringify({
        token: token,
        id: dataUserSwitch.id,
        roleId: dataUserSwitch.roleId,
        prevData: {
          id: user.id,
          roleId: user.roleId,
        },
      })
    );

    let timerInterval;
    Swal.fire({
      title: `You will be redirected to the user ${dataUserSwitch.name} `,
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
  };

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
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("tabla.buscarEmail")}
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
                  {[...currentItems].map((item, index) => (
                    <tr
                      className={`${
                        (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                      } w-full`}
                      key={item.id}
                    >
                      <td className="py-3 px-6">{item.name}</td>
                      <td className="py-3 px-6">{item.email}</td>
                      <td className="py-3 px-6">{item.region}</td>
                      <td className="py-3 px-6">
                        {item.roleId === 5
                          ? "Sales Rep"
                          : item.roleId === 3
                          ? "Partner Admin"
                          : "Partner Principal"}
                      </td>
                      <td className="py-3 px-6">{companyIdentify(item)}</td>
                      <td className="py-3 px-6">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleSubmit(item)}
                        >
                          Switch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
        </div>
      </Modal>
      <div>
        <button
          className="btn btn-sm w-full !btn-outline btn-info"
          onClick={() => {
            setOpened(true);
            dispatch(getUsersData(token));
          }}
        >
          Switch
        </button>
      </div>
    </>
  );
};

export default ModalSwitchUser;
