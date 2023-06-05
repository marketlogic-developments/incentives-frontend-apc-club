import React from "react";
import { useDispatch } from "react-redux";
import { setMenuMarket } from "../../store/reducers/awards.reducer";

const ModalTargetInfo = ({ info, addItem, setCounter, setOpened }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    addItem();
    setCounter(0);
    dispatch(setMenuMarket(true));
    setOpened(false);
  };

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="flex justify-center">
        <figure className="w-1/4">
          <img
            src={info.imagePath}
            alt={`logo_${info.name}`}
            className="w-full"
          />
        </figure>
      </div>
      <div className="w-full">
        <p className="font-bold !text-xl text-center">
          Condiciones Importantes
        </p>
      </div>
      <div>
        {
          <div className="gap-6 flex px-12 items-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 16.25V8.9375M2.25 8.9375V16.25M1.125 16.8125H16.875M10.125 16.8125V11.4688C10.125 11.245 10.2139 11.0304 10.3721 10.8721C10.5304 10.7139 10.745 10.625 10.9688 10.625H13.2188C13.4425 10.625 13.6571 10.7139 13.8154 10.8721C13.9736 11.0304 14.0625 11.245 14.0625 11.4688V16.8125M13.4462 2.1875H4.55379C3.78773 2.1875 3.09586 2.60938 2.79844 3.25836L1.27617 6.58203C0.763594 7.70035 1.61473 8.96738 2.9352 9.00781H3.00551C4.10941 9.00781 5.00414 8.12258 5.00414 7.1716C5.00414 8.12082 5.89922 9.00781 7.00312 9.00781C8.10703 9.00781 9 8.18586 9 7.1716C9 8.12082 9.89473 9.00781 10.9986 9.00781C12.1025 9.00781 12.9976 8.18586 12.9976 7.1716C12.9976 8.18586 13.8923 9.00781 14.9962 9.00781H15.0648C16.3853 8.96668 17.2364 7.69965 16.7238 6.58203L15.2016 3.25836C14.9041 2.60938 14.2123 2.1875 13.4462 2.1875ZM4.78125 10.625H7.59375C7.81753 10.625 8.03214 10.7139 8.19037 10.8721C8.34861 11.0304 8.4375 11.245 8.4375 11.4688V14.5625H3.9375V11.4688C3.9375 11.245 4.02639 11.0304 4.18463 10.8721C4.34286 10.7139 4.55747 10.625 4.78125 10.625Z"
                stroke="#1473E6"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="!text-xs">
              Con la tarjeta digital recargable Cencosud, puedes hacer compras
              en tiendas y locales Jumbo, Paris, Paris.cl, Easy y Santa Isabel a
              lo largo de Chile.
            </p>
          </div>
        }
      </div>
      <div className="w-full flex justify-center">
        <button className="btn btn-info !btn-outline w-1/2" onClick={handleAdd}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default ModalTargetInfo;
