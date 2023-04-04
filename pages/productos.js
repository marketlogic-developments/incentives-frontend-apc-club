import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import { getProductsData } from "../store/reducers/sales.reducer";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as XLSX from "xlsx";

const productos = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const products = useSelector((state) => state.sales.products);
  const [data, setData] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const [searchSku, setSearchSku] = useState("");
  const [selectDate, setSelectDate] = useState("");

  const importFile = (data) => {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    XLSX.writeFile(workbook, "Productos_Participantes.xlsx");
  };

  console.log(data);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getProductsData(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6">
                Unidad de negocio
              </th>
              <th scope="col" className="py-3 px-6">
                SubBu
              </th>
              <th scope="col" className="py-3 px-6">
                Categoría
              </th>
              <th scope="col" className="py-3 px-6">
                Tipo de negocio
              </th>
              <th scope="col" className="py-3 px-6">
                SKU
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-500"
                >
                  <td className="py-4 px-6">{product.businessUnit}</td>
                  <td className="py-4 px-6">{product.subBu}</td>
                  <td className="py-4 px-6">{product.categoryType}</td>
                  <td className="py-4 px-6">{product.businessType}</td>
                  <td className="py-4 px-6">{product.code}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return data.slice(itemOffset, endOffset);
  }, [itemOffset, data]);

  const pageCount = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  const search = useMemo(() => {
    const newData = products.map((data) => ({
      ...data,
      CreatedAt: new Date(data.CreatedAt),
    }));

    if (searchSku !== "" && selectDate !== "") {
      const dataSort = newData
        .sort((a, b) => {
          if (selectDate === "upDown") {
            return b.CreatedAt - a.CreatedAt;
          }

          return a.CreatedAt - b.CreatedAt;
        })
        .filter(({ skuUuid }) => {
          return skuUuid.startsWith(searchSku.toLocaleLowerCase());
        });

      return setData(dataSort);
    }

    if (searchSku !== "") {
      return setData(
        products.filter(({ skuUuid }) => {
          return skuUuid.startsWith(searchSku.toLocaleLowerCase());
        })
      );
    }

    if (selectDate !== "") {
      const dataSort = newData.sort((a, b) => {
        if (selectDate === "upDown") {
          return b.CreatedAt - a.CreatedAt;
        }

        return a.CreatedAt - b.CreatedAt;
      });

      return setData(dataSort);
    }
  }, [searchSku, selectDate]);

  return (
    <>
      <ContainerContent pageTitle={"Productos Participantes"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{t("menu.Productos")}</h1>
          </div>
          <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
            <div className="grid grid-cols-3 gap-3">
              <select
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm col-span-2"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setData(products);
                  }

                  return setSelectDate(e.target.value);
                }}
              >
                <option value="">{t("tabla.ordenarFecha")}</option>
                <option value="upDown">{t("tabla.recienteA")}</option>
                <option value="downUp">{t("tabla.antiguoR")}</option>
              </select>
              <button
                className="btn btn-primary w-max justify-self-end"
                onClick={() => importFile(data)}
              >
                Exportar
              </button>
              <div className="flex justify-between col-span-3">
                <input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setData(products);
                    }

                    return setSearchSku(e.target.value);
                  }}
                  placeholder={t("tabla.buscarSku")}
                  className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                />
              </div>
            </div>

            {loading && <div className="lds-dual-ring"></div>}
            {!loading && <Table currentItems={currentItems} />}
            {!loading && (
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
            )}
          </div>
        </div>
      </ContainerContent>
      {/* <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-5xl flex flex-col items-center">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2  bg-red-500 hover:bg-red-700"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-red-500">
            Agregar Participante
          </h3>
          <p className="py-4">
            Indica la información de la cuenta , personal y de compañía del
            participante.
          </p>
          <div className="w-full flex flex-col items-center">
            <h3 className="text-lg font-bold text-red-500">
              Información de la Cuenta
            </h3>
            <div className="form-control w-9/12">
              <label className="label">
                <span className="label-text">Tipo de producto</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Sku</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Grupo de ventas</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Tipo de usuario</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Periodo</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <div className="w-full flex justify-center gap-5 py-8">
                <label
                  htmlFor="my-modal-3"
                  className="btn bg-base-100 hover:bg-base-200 text-red-500 font-bold py-2 px-4 rounded-full w-5/12"
                >
                  Cancelar
                </label>
                <label
                  htmlFor="my-modal-3"
                  className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-5/12"
                >
                  Guardar
                </label>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 3, 5],
    },
  };
}

export default productos;
