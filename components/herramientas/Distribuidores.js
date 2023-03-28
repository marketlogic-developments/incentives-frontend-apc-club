import { Modal } from "@mantine/core";
import React, { useMemo, useState, useEffect } from "react";
import InfoCanal from "./infoCanal";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyAll,
  getDistriAll,
} from "../../store/reducers/company.reducer";
import ButtonDistAgregar from "./ButtonDistAgregar";

const Distribuidores = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.users);

  const currentPage = useSelector((state) => state.currentPage || 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !token || !user) {
      return;
    }

    setLoading(true);

    dispatch(getDistriAll(token))
      .then((data) => {
        const filteredData = data;

        filteredData.sort(
          (a, b) => new Date(b.saleDates) - new Date(a.saleDates)
        );

        setData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isLoaded, token, currentPage, postsPerPage, user]);

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return <ButtonDistAgregar />;
    }
    if (modal === 1) {
      return <InfoCanal data={"data"} />;
    }
  }, [modal]);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} size={"60%"}>
        {typeModal}
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white h-full flex flex-col gap-5">
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mt-4 w-full place-items-center">
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
                placeholder={"buscar por reseller"}
                className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              />
            </div>
          </div>
          <button
            className="btn btn-primary justify-self-end rounded-full"
            onClick={() => {
              setModal(0);
              setOpened(true);
            }}
          >
            Agregar Distribuidor
          </button>
        </div>

        <div className="container">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-black-500 uppercase">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Nombre del Distribuidor
                  </th>
                  <th scope="col" className="py-3 px-6">
                    No. Reseller
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Tipo de partner
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:border-gray-500 hover:bg-warning hover:cursor-pointer"
                      onClick={() => {
                        setModal(1);
                        setOpened(true);
                      }}
                    >
                      <td className="py-4 px-6">{item.nameDist}</td>
                      <td className="py-4 px-6">{item.soldToParty}</td>
                      <td className="py-4 px-6">DISTRIBUITOR</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Distribuidores;
