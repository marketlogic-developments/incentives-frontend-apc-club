const TableFilter = () => {
  return (
    <>
      <div className="m-6">
        <div className="w-full md:w-2/2 shadow p-5 rounded-lg bg-white">
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
              Filtros
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">Compañía</option>
                <option value="for-rent">Compañía 1</option>
                <option value="for-sale">Compañía 2</option>
              </select>

              <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">País</option>
                <option value="fully-furnished">País 1</option>
                <option value="partially-furnished">País 2</option>
                <option value="not-furnished">País 3</option>
              </select>

              <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                <option value="">Seleccina el rol</option>
                <option value="1000">Rol 1</option>
                <option value="2000">Rol 2</option>
                <option value="3000">Rol 3</option>
                <option value="4000">Rol 4</option>
              </select>

              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Agregar participantes
              </button>
            </div>
            <br></br>
            <div className="relative">
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

              <input
                type="text"
                placeholder="Buscar"
                className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              />
            </div>
            <div className="flex items-center ml-2 h-full">
              <button className="bg-black-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded-full">
                Buscar
              </button>
            </div>
          </div>
          <br></br>
          <div className="container">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-black-500">
                <thead className="text-xs text-black-500 uppercase">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Nombre de participantes
                    </th>
                    <th scope="col" className="py-3 px-6">
                      País
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Idioma
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Correo
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Fecha de activación
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:border-gray-500">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      Lorem ipsum
                    </th>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                  </tr>
                  <tr className="bg-white border-b dark:border-gray-500">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      Lorem ipsum
                    </th>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                  </tr>
                  <tr className="bg-white border-b dark:border-gray-500">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      Lorem ipsum
                    </th>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                    <td className="py-4 px-6">Lorem ipsum</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableFilter;
