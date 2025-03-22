import { useState } from "react";
import MiniTarget from "./MiniTarget";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCarPush, productsPush } from "../../../store/reducers/awards.reducer";
import { RootState } from "store/store";
import { ShoppingCarProduct } from "services/Awards/awards.service";
import AwardsFunction from "functions/Awards/AwardsFunction";

const CardMenuMarket = ({
  cardData,
  index,
}: {
  cardData: ShoppingCarProduct;
  index: number;
}) => {
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const car = useSelector((state: RootState) => state.awards.shoopingCar);
  const { AddProduct, DeleteProduct } = AwardsFunction();
  const dispatch = useDispatch();

  useEffect(() => setCounter(cardData.quantity), [cardData]);


  const product = (operation: "SUM" | "REDUCE") => ({
    product_id: cardData.product_id,
    operation: operation,
    quantity: 1,
  });

  const buttonsFunctionAdd = async () => {
    setCounter(counter + 1);

    await AddProduct(product("SUM")).then((res) => {
      const copyCar = [...car.products];

      copyCar[index] = { ...cardData, quantity: counter + 1 };

      dispatch(productsCarPush(copyCar));
    });
  };

  const buttonsFunctionMinus = async () => {
    const copyCar = [...car.products];

    if (counter !== 0) {
      setCounter(counter - 1);

      await AddProduct(product("REDUCE")).then((res) =>{
        if (counter - 1 === 0) {
          return deleteItem();
        }
  
        copyCar[index] = { ...cardData, quantity: counter - 1 };
        dispatch(productsCarPush(copyCar));
      });
    }
  };

  const deleteItem = async () => {
    setLoading(true)
    await DeleteProduct(cardData.product_id).then(()=>{
      const newCar = car.products.filter((item) => cardData.product_id !== item.product_id);


      dispatch(productsCarPush(newCar));
      return setLoading(false)
    })
    
  };

  return (
    <div className={`flex justify-between ${loading && "opacity-[0.6]"}`}>
      <div className="flex gap-2">
        <div>
          <MiniTarget cardInfo={cardData} />
        </div>

        <div className="flex flex-col lg:gap-0 gap-3">
          <p className="xl:!text-lg font-bold">{cardData.name}</p>
          <div className="flex lg:gap-1 gap-4">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:flex hidden"
            >
              <path
                d="M8.99127 8.89576L7.63127 5.36013C7.61087 5.30707 7.57486 5.26145 7.528 5.22926C7.48114 5.19708 7.42562 5.17985 7.36877 5.17985C7.31193 5.17985 7.25641 5.19708 7.20955 5.22926C7.16269 5.26145 7.12668 5.30707 7.10627 5.36013L5.74627 8.89576C5.73215 8.9325 5.71047 8.96586 5.68264 8.99369C5.65481 9.02152 5.62145 9.0432 5.58471 9.05733L2.04909 10.4173C1.99603 10.4377 1.9504 10.4737 1.91822 10.5206C1.88604 10.5675 1.86881 10.623 1.86881 10.6798C1.86881 10.7367 1.88604 10.7922 1.91822 10.8391C1.9504 10.8859 1.99603 10.9219 2.04909 10.9423L5.58471 12.3023C5.62145 12.3165 5.65481 12.3381 5.68264 12.366C5.71047 12.3938 5.73215 12.4272 5.74627 12.4639L7.10627 15.9995C7.12668 16.0526 7.16269 16.0982 7.20955 16.1304C7.25641 16.1626 7.31193 16.1798 7.36877 16.1798C7.42562 16.1798 7.48114 16.1626 7.528 16.1304C7.57486 16.0982 7.61087 16.0526 7.63127 15.9995L8.99127 12.4639C9.0054 12.4272 9.02708 12.3938 9.05491 12.366C9.08274 12.3381 9.1161 12.3165 9.15284 12.3023L12.6885 10.9423C12.7415 10.9219 12.7871 10.8859 12.8193 10.8391C12.8515 10.7922 12.8687 10.7367 12.8687 10.6798C12.8687 10.623 12.8515 10.5675 12.8193 10.5206C12.7871 10.4737 12.7415 10.4377 12.6885 10.4173L9.15284 9.05733C9.1161 9.0432 9.08274 9.02152 9.05491 8.99369C9.02708 8.96586 9.0054 8.9325 8.99127 8.89576ZM4.24377 2.80481L3.61877 1.17981L2.99377 2.80481L1.36877 3.42981L2.99377 4.05482L3.61877 5.67982L4.24377 4.05482L5.86877 3.42981L4.24377 2.80481ZM14.2022 4.34638L13.3688 2.17981L12.5353 4.34638L10.3688 5.17982L12.5353 6.01326L13.3688 8.17983L14.2022 6.01326L16.3688 5.17982L14.2022 4.34638Z"
                stroke="#EB1000"
                stroke-width="1.03964"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="!text-xs">{cardData.price} DigiPoints</p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col items-center w-1/3 justify-around">
        <div className="grid grid-cols-3 w-1/2 place-items-center">
          <button onClick={buttonsFunctionAdd}>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8687 10.5C17.8687 6.35938 14.5093 3 10.3687 3C6.22803 3 2.86865 6.35938 2.86865 10.5C2.86865 14.6406 6.22803 18 10.3687 18C14.5093 18 17.8687 14.6406 17.8687 10.5Z"
                stroke="#2C2C2C"
                stroke-width="1.3125"
                stroke-miterlimit="10"
              />
              <path
                d="M10.3687 7.375V13.625M13.4937 10.5H7.24365"
                stroke="#2C2C2C"
                stroke-width="1.3125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <p className="xl:!text-sm text-primary">{counter}</p>
          <button onClick={buttonsFunctionMinus}>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8687 10.5C17.8687 14.6406 14.5093 18 10.3687 18C6.22803 18 2.86865 14.6406 2.86865 10.5C2.86865 6.35938 6.22803 3 10.3687 3C14.5093 3 17.8687 6.35938 17.8687 10.5Z"
                stroke="#2C2C2C"
                stroke-width="1.25"
                stroke-miterlimit="10"
              />
              <path
                d="M13.4937 10.5H7.24365"
                stroke="#2C2C2C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          className="w-1/2 flex justify-center items-center cursor-pointer"
          onClick={deleteItem}
        >
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8171 4.03764H13.9396V3.06829C13.9396 2.63981 13.7694 2.22888 13.4664 1.92589C13.1635 1.62291 12.7525 1.4527 12.324 1.4527H9.09286C8.66438 1.4527 8.25345 1.62291 7.95046 1.92589C7.64748 2.22888 7.47727 2.63981 7.47727 3.06829V4.03764H3.59985C3.42846 4.03764 3.26408 4.10573 3.14289 4.22692C3.0217 4.34811 2.95361 4.51249 2.95361 4.68388C2.95361 4.85527 3.0217 5.01964 3.14289 5.14084C3.26408 5.26203 3.42846 5.33012 3.59985 5.33012H4.28648L5.05388 17.6458C5.11124 18.7302 5.94246 19.5473 6.99259 19.5473H14.4243C15.4797 19.5473 16.2944 18.7484 16.363 17.649L17.1304 5.33012H17.8171C17.9884 5.33012 18.1528 5.26203 18.274 5.14084C18.3952 5.01964 18.4633 4.85527 18.4633 4.68388C18.4633 4.51249 18.3952 4.34811 18.274 4.22692C18.1528 4.10573 17.9884 4.03764 17.8171 4.03764ZM8.14653 16.9624H8.1235C7.95603 16.9625 7.79505 16.8976 7.6745 16.7813C7.55395 16.665 7.48323 16.5065 7.47727 16.3392L7.15415 7.29185C7.14804 7.12045 7.21027 6.95366 7.32715 6.82815C7.44402 6.70264 7.60597 6.62869 7.77736 6.62259C7.94876 6.61648 8.11556 6.67871 8.24107 6.79559C8.36658 6.91246 8.44052 7.07441 8.44662 7.2458L8.76974 16.2931C8.77282 16.378 8.75913 16.4626 8.72947 16.5422C8.69981 16.6218 8.65475 16.6948 8.59687 16.7569C8.53898 16.8191 8.46942 16.8692 8.39215 16.9045C8.31487 16.9397 8.23141 16.9594 8.14653 16.9624ZM11.3547 16.3161C11.3547 16.4875 11.2866 16.6519 11.1654 16.7731C11.0442 16.8943 10.8798 16.9624 10.7085 16.9624C10.5371 16.9624 10.3727 16.8943 10.2515 16.7731C10.1303 16.6519 10.0622 16.4875 10.0622 16.3161V7.26883C10.0622 7.09743 10.1303 6.93306 10.2515 6.81187C10.3727 6.69067 10.5371 6.62259 10.7085 6.62259C10.8798 6.62259 11.0442 6.69067 11.1654 6.81187C11.2866 6.93306 11.3547 7.09743 11.3547 7.26883V16.3161ZM12.6472 4.03764H8.76974V3.06829C8.76925 3.02572 8.77728 2.98348 8.79334 2.94406C8.80941 2.90464 8.83319 2.86883 8.86329 2.83872C8.8934 2.80862 8.92921 2.78484 8.96863 2.76877C9.00806 2.75271 9.05029 2.74468 9.09286 2.74517H12.324C12.3666 2.74468 12.4088 2.75271 12.4483 2.76877C12.4877 2.78484 12.5235 2.80862 12.5536 2.83872C12.5837 2.86883 12.6075 2.90464 12.6236 2.94406C12.6396 2.98348 12.6476 3.02572 12.6472 3.06829V4.03764ZM13.9396 16.3392C13.9337 16.5065 13.863 16.665 13.7424 16.7813C13.6219 16.8976 13.4609 16.9625 13.2934 16.9624H13.27C13.1851 16.9593 13.1017 16.9396 13.0245 16.9044C12.9472 16.8691 12.8777 16.8189 12.8199 16.7568C12.7621 16.6946 12.717 16.6217 12.6874 16.5421C12.6578 16.4626 12.6441 16.378 12.6472 16.2931L12.9703 7.2458C12.9733 7.16094 12.993 7.0775 13.0283 7.00025C13.0635 6.923 13.1137 6.85346 13.1758 6.79559C13.238 6.73772 13.3109 6.69265 13.3905 6.66297C13.47 6.63329 13.5547 6.61957 13.6395 6.62259C13.7244 6.62561 13.8078 6.64532 13.8851 6.68059C13.9623 6.71586 14.0319 6.766 14.0898 6.82815C14.1476 6.89029 14.1927 6.96323 14.2224 7.04279C14.2521 7.12235 14.2658 7.20698 14.2628 7.29185L13.9396 16.3392Z"
              fill="#BABABA"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CardMenuMarket;
