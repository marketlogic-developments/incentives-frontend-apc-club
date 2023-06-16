import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenuMarket } from "../../store/reducers/awards.reducer";
import { useTranslation } from "react-i18next";

const ModalTargetInfo = ({ info, addItem, setCounter, setOpened }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const description = user.languageId === 2 ? info.cardInfoES : info.cardInfoPT;
  const arrayDescription = description.split("|");
  const [t, i18n] = useTranslation("global");

  const handleAdd = () => {
    addItem();
    setCounter(0);
    dispatch(setMenuMarket(true));
    setOpened(false);
  };

  const items = [
    {
      svg: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-baseline"
        >
          <path
            d="M15.75 16.25V8.9375M2.25 8.9375V16.25M1.125 16.8125H16.875M10.125 16.8125V11.4688C10.125 11.245 10.2139 11.0304 10.3721 10.8721C10.5304 10.7139 10.745 10.625 10.9688 10.625H13.2188C13.4425 10.625 13.6571 10.7139 13.8154 10.8721C13.9736 11.0304 14.0625 11.245 14.0625 11.4688V16.8125M13.4462 2.1875H4.55379C3.78773 2.1875 3.09586 2.60938 2.79844 3.25836L1.27617 6.58203C0.763594 7.70035 1.61473 8.96738 2.9352 9.00781H3.00551C4.10941 9.00781 5.00414 8.12258 5.00414 7.1716C5.00414 8.12082 5.89922 9.00781 7.00312 9.00781C8.10703 9.00781 9 8.18586 9 7.1716C9 8.12082 9.89473 9.00781 10.9986 9.00781C12.1025 9.00781 12.9976 8.18586 12.9976 7.1716C12.9976 8.18586 13.8923 9.00781 14.9962 9.00781H15.0648C16.3853 8.96668 17.2364 7.69965 16.7238 6.58203L15.2016 3.25836C14.9041 2.60938 14.2123 2.1875 13.4462 2.1875ZM4.78125 10.625H7.59375C7.81753 10.625 8.03214 10.7139 8.19037 10.8721C8.34861 11.0304 8.4375 11.245 8.4375 11.4688V14.5625H3.9375V11.4688C3.9375 11.245 4.02639 11.0304 4.18463 10.8721C4.34286 10.7139 4.55747 10.625 4.78125 10.625Z"
            stroke="#1473E6"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      text: arrayDescription[0],
    },
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-baseline"
        >
          <path
            d="M5.1191 16.3125H12.8809C13.577 16.3125 14.1307 15.7398 14.0558 15.0799C13.5724 10.8281 10.6875 10.8984 10.6875 9C10.6875 7.10156 13.6093 7.20703 14.0555 2.92008C14.1258 2.25984 13.577 1.6875 12.8809 1.6875H5.1191C4.423 1.6875 3.87562 2.25984 3.94453 2.92008C4.39066 7.20703 7.31249 7.06641 7.31249 9C7.31249 10.9336 4.42757 10.8281 3.94453 15.0799C3.86929 15.7398 4.423 16.3125 5.1191 16.3125Z"
            stroke="#1473E6"
            stroke-width="1.375"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0691 15.1875H5.94597C5.39754 15.1875 5.24285 14.5547 5.62746 14.1623C6.5584 13.2188 8.4375 12.543 8.4375 11.4609V7.875C8.4375 7.17715 7.10156 6.64453 6.27504 5.5125C6.13863 5.32582 6.15234 5.0625 6.49898 5.0625H11.5168C11.8125 5.0625 11.8765 5.32371 11.7418 5.51074C10.9273 6.64453 9.5625 7.17363 9.5625 7.875V11.4609C9.5625 12.5343 11.5211 13.1133 12.3891 14.1634C12.7389 14.5867 12.6165 15.1875 12.0691 15.1875Z"
            fill="#1473E6"
          />
        </svg>
      ),
      text: arrayDescription[1],
    },
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-baseline"
        >
          <path
            d="M9 16.0312C12.8833 16.0312 16.0312 12.8832 16.0312 8.99999C16.0312 5.11674 12.8833 1.96874 9 1.96874C5.11675 1.96874 1.96875 5.11674 1.96875 8.99999C1.96875 12.8832 5.11675 16.0312 9 16.0312Z"
            stroke="#1473E6"
            stroke-width="1.6875"
            stroke-miterlimit="10"
          />
          <path
            d="M4.02821 4.02818L13.9718 13.9718L4.02821 4.02818Z"
            fill="#1473E6"
          />
          <path
            d="M4.02821 4.02818L13.9718 13.9718"
            stroke="#1473E6"
            stroke-width="1.6875"
            stroke-miterlimit="10"
          />
        </svg>
      ),
      text: arrayDescription[2],
    },
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-baseline"
        >
          <path
            d="M9 1.6875C4.9616 1.6875 1.6875 4.9616 1.6875 9C1.6875 13.0384 4.9616 16.3125 9 16.3125C13.0384 16.3125 16.3125 13.0384 16.3125 9C16.3125 4.9616 13.0384 1.6875 9 1.6875Z"
            stroke="#1473E6"
            stroke-width="1.125"
            stroke-miterlimit="10"
          />
          <path
            d="M9 1.6875C6.95847 1.6875 5.03894 4.9616 5.03894 9C5.03894 13.0384 6.95847 16.3125 9 16.3125C11.0415 16.3125 12.9611 13.0384 12.9611 9C12.9611 4.9616 11.0415 1.6875 9 1.6875Z"
            stroke="#1473E6"
            stroke-width="1.125"
            stroke-miterlimit="10"
          />
          <path
            d="M4.12488 4.12485C5.46925 5.07934 7.16167 5.64852 9 5.64852C10.8383 5.64852 12.5307 5.07934 13.8751 4.12485M13.8751 13.8751C12.5307 12.9206 10.8383 12.3514 9 12.3514C7.16167 12.3514 5.46925 12.9206 4.12488 13.8751"
            stroke="#1473E6"
            stroke-width="1.125"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 1.6875V16.3125M16.3125 9H1.6875"
            stroke="#1473E6"
            stroke-width="1.125"
            stroke-miterlimit="10"
          />
        </svg>
      ),
      text: arrayDescription[3],
    },
  ];

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="flex justify-center containerBgCards">
        <figure
          className={`w-1/4 ${
            info.name.split(" ")[0] === "Visa"
              ? "bgVisa"
              : info.name.split(" ")[0] === "MasterCard"
              ? "bgMaster"
              : info.name.split(" ")[0] === "Cencosud"
              ? "bg-info"
              : info.name.split(" ")[0] === "Rappi"
              ? "bgRappi"
              : info.name.split(" ")[0] === "Falabella" && "bgFalabella"
          } p-3 rounded-lg`}
        >
          <img
            src={info.imagePath}
            alt={`logo_${info.name}`}
            className="w-full"
          />
        </figure>
      </div>
      <div className="w-full">
        <p className="font-bold !text-xl text-center">
          {t("adobeMarket.condiciones")}
        </p>
      </div>
      <div className="flex flex-col gap-6 svgInfoCard">
        {items.map(({ svg, text }) => (
          <div className="gap-6 flex px-12 items-center">
            {svg}
            <p className="!text-xs">{text}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button className="btn btn-info !btn-outline w-1/2" onClick={handleAdd}>
          {t("adobeMarket.entendido")}
        </button>
      </div>
    </div>
  );
};

export default ModalTargetInfo;
