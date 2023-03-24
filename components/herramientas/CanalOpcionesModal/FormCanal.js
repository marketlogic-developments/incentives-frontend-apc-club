import React, { useState } from "react";

const FormCanal = () => {
  const [form, setForm] = useState({
    name: "",
    representativeId: "",
    phoneNumber: "",
    distChannelsId: "",
    maxDayAssign: "",
    resellerMasterId: "",
    goalsPerQuarter: "",
    goalsPerYear: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios.post(
    //   `${process.env.BACKURL}/companies`,
    //   {
             /*  name: form.name,
              representativeId: form.representativeId,
              phoneNumber: form.phoneNumber,
              distChannelsId: form.distChannelsId,
              maxDayAssign: form.maxDayAssign,
              resellerMasterId: form.resellerMasterId,
              goalsPerQuarter: form.goalsPerQuarter,
              goalsPerYear: form.goalsPerYear, */
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    return console.log({
                    name: form.name,
                    representativeId: form.representativeId,
                    phoneNumber: form.phoneNumber,
                    distChannelsId: form.distChannelsId,
                    maxDayAssign: form.maxDayAssign,
                    resellerMasterId: form.resellerMasterId,
                    goalsPerQuarter: form.goalsPerQuarter,
                    goalsPerYear: form.goalsPerYear,
                  });
  };
  const handleChange = (e) => {
    return setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <p className="py-4 text-center">
          Indica la información del canal que vas a registrar
        </p>
        <div className="w-full flex flex-col items-center">
          <form
            className="grid grid-cols-2 gap-5 w-11/12"
            onSubmit={handleSubmit}
          >
            <label className="inputCreateUser">
              <span className="label-text">Nombre</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="name"
                onChange={handleChange}
              />
            </label>
            <label className="inputCreateUser">
              <span className="label-text">Company Level</span>
              <select
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="distChannelsId"
                onChange={handleChange}
              >
                <option disabled selected>Selecciona Uno</option>
                <option value="1">Gold</option>
                <option value="2">Platinum</option>
              </select>
            </label>

            <label className="inputCreateUser">
              <span className="label-text">Días para asignar</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="maxDayAssign"
                onChange={handleChange}
              />
            </label>
            <label className="inputCreateUser">
              <span className="label-text">Teléfono</span>
              <input
                type="tel"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="phoneNumber"
                onChange={handleChange}
              />
            </label>
            <label className="inputCreateUser">
              <span className="label-text">Representante PA</span>
              <select
                className="select select-bordered w-full"
                name="resellerMasterId"
                onChange={handleChange}
              >
                <option disabled selected>Seleccione el usuario</option>
                <option value="1">usuario 1</option>
                <option value="2">usuario 2</option>
              </select>
            </label>
            <label className="inputCreateUser">
              <span className="label-text">MasterId</span>
              <input
                className="input input-bordered w-full"
                name="resellerMasterId"
                onChange={handleChange}
              />
            </label>
            <label className="inputCreateUser">
              <span className="label-text">Meta por Q</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="goalsPerQuarter"
                onChange={handleChange}
              />
            </label>
            <label className="inputCreateUser">
              <span className="label-text">Meta por año</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="goalsPerYear"
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary justify-self-center rounded-full  w-max col-span-2"
            >
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCanal;
