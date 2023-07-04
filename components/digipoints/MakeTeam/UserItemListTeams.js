import React from "react";

const UserItemListTeams = ({
  data,
  setCheckboxes,
  checkboxes,
  modifiedValues,
  setModifiedValues,
}) => {
  function handleCheckboxChange(data) {
    setCheckboxes((prevCheckboxes) => {
      if (prevCheckboxes.map(({ id }) => id).includes(data.id)) {
        // Si el checkbox ya estaba seleccionado, se remueve del estado
        return prevCheckboxes.filter((checkbox) => checkbox.id !== data.id);
      } else {
        // Si el checkbox no estaba seleccionado, se agrega al estado
        return [...prevCheckboxes, { ...data, percentage: 0 }];
      }
    });
    setModifiedValues((prevModifiedValues) => {
      if (
        prevModifiedValues.map(({ memberId }) => memberId).includes(data.id)
      ) {
        // Si el checkbox ya estaba seleccionado, se remueve del estado
        return prevModifiedValues.filter(
          ({ memberId }) => memberId !== data.id
        );
      } else {
        // Si el checkbox no estaba seleccionado, se agrega al estado
        return [...prevModifiedValues, { memberId: data.id, percentage: 0 }];
      }
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3 items-center font-normal w-full">
      <div className="flex gap-6 items-center">
        <input
          type="checkbox"
          checked={checkboxes.map(({ id }) => id).includes(data.id)}
          onChange={() => handleCheckboxChange(data)}
          className="checkbox checkbox-xs checkbox-info"
        />
        <div class="user bg-[#1473E6] rounded-full w-[25px] h-[25px] max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] flex items-center justify-center">
          <p class="text-white text-xs font-normal text-center">
            {data.name[0]}
          </p>
        </div>
        <div>
          <p className="text-xs">{data.name}</p>
        </div>
      </div>

      <div>
        <p className="text-xs">{data.email}</p>
      </div>
    </div>
  );
};

export default UserItemListTeams;
