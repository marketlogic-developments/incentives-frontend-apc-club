import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CardMarket = ({ info, setAwards, awards }) => {
  const [counter, setCounter] = useState(0);
  const [opened, setOpened] = useState(false);

  const setGlobalStateAwards = (counter) => {
    const awardFilter = awards.filter(({ id }) => id !== info.id);

    if (counter === 0) {
      return setAwards([...awardFilter]);
    }

    return setAwards([...awardFilter, { ...info, quantity: counter }]);
  };

  return (
    <>
      <Modal
        className="modalCardCatalogo"
        size={"90%"}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Detalles del Producto"}
      >
        <div className="my-[5%] mx-[5%] grid grid-cols-4">
          <div>
            <figure className="w-full">
              <img
                src={info.imagePath}
                alt={info.name}
                className="w-full block"
              />
            </figure>
          </div>
          <div className="col-span-2 px-[5%]">
            <div className="flex flex-col gap-2">
              <p className="text-[#eb1000] font-bold text-3xl">
                $60 Virtual Card
              </p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">1234 DigiPoints</p>
                <p>Item ID:OP-POR500</p>
              </div>
            </div>
            <hr className="my-[2%]" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex gap-5">
                  <p className="font-bold text-2xl">Cantidad:</p>
                  <div className="containerCounter flex justify-center">
                    <button
                      className="buttonminus"
                      onClick={() => {
                        counter <= 0
                          ? null
                          : (setCounter(counter - 1),
                            setGlobalStateAwards(counter - 1));
                      }}
                    >
                      -
                    </button>
                    <input
                      className="numberstyle text-black"
                      type="number"
                      id="counter"
                      name="counter"
                      min="0"
                      max="50"
                      placeholder="0"
                      value={counter > 0 && counter}
                      onChange={(e) => {
                        Number(e.currentTarget.value) <= -1
                          ? setCounter(0)
                          : setCounter(Number(e.currentTarget.value));
                      }}
                    ></input>
                    <button
                      className="buttonplus"
                      onClick={() => {
                        setCounter(counter + 1);
                        setGlobalStateAwards(counter + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button className="btn !btn-outline w-full">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#eb1000] font-bold text-3xl">Descripción:</p>
            <p className="text-sm">
              Recibirás un correo electrónico con un código virtual. Solo
              tendrás 90 DÍAS para activarlo. Deberás ingresar a
              https://www.myprepaidcenter.com/redeem y crear un perfil. Una vez
              hayas finalizado este proceso se te asignará una tarjeta debito
              virtual Mastercard de 16 dígitos, con su respectivo código de
              verificación.
            </p>
            <p className="text-sm">
              Con esta tarjeta solo podrás realizar compras en tiendas
              virtuales. No olvides agregar la tarjeta a tu perfil. De esta
              manera podrás revisar los datos cómo el balance y fecha de
              expiración de tu premio, la cual es de 6 MESES.
            </p>
          </div>
        </div>
      </Modal>
      <div class="flip-card-market">
        <div class="flip-card-inner-market">
          <div class="flip-card-front-market">
            <div className="card-details justify-center">
              <figure
                onClick={() => setOpened(true)}
                className="cursor-pointer"
              >
                <img
                  src={info.imagePath}
                  alt={info.name}
                  className="imgMarket"
                />
              </figure>

              <p className="text-title">
                {info.digipoints} <br /> DigiPoints
              </p>
              <div className="containerCounter flex justify-center">
                <button
                  className="buttonminus"
                  onClick={() => {
                    counter <= 0
                      ? null
                      : (setCounter(counter - 1),
                        setGlobalStateAwards(counter - 1));
                  }}
                >
                  -
                </button>
                <input
                  className="numberstyle text-black"
                  type="number"
                  id="counter"
                  name="counter"
                  min="0"
                  max="50"
                  placeholder="0"
                  value={counter > 0 && counter}
                  onChange={(e) => {
                    Number(e.currentTarget.value) <= -1
                      ? setCounter(0)
                      : setCounter(Number(e.currentTarget.value));
                  }}
                ></input>
                <button
                  className="buttonplus"
                  onClick={() => {
                    setCounter(counter + 1);
                    setGlobalStateAwards(counter + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardMarket;
