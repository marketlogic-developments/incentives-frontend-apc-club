import React from "react";
import { useTranslation } from "react-i18next";

const Puntos = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-center">
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
                    // onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("tabla.buscarEmail")}
                    className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-black-500">
          <thead className="text-xs text-black-500 uppercase">
            <tr>
              <th scope="col" className="py-2 px-2">
                Nombre
              </th>
              <th scope="col" className="py-2 px-2">
                Email
              </th>
              <th scope="col" className="py-2 px-2">
                DigiPoints
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Puntos;
