import React, { FC } from "react";
import { CurrentUser } from "services/User/user.service";

interface Props {
  data: CurrentUser;
  setCheckboxes?: any;
  checkboxes?: any;
  modifiedValues?: any;
  setModifiedValues?: any;
}

const UserItemListTeams: FC<Props> = ({
  data,
  setCheckboxes,
  checkboxes,
  modifiedValues,
  setModifiedValues,
}) => {
  function handleCheckboxChange(data: CurrentUser) {
    setCheckboxes((prevCheckboxes:any) => {
      if (prevCheckboxes.map(({ id }:{id:any}) => id).includes(data.id)) {
        // Si el checkbox ya estaba seleccionado, se remueve del estado
        return prevCheckboxes.filter((checkbox:any) => checkbox.id !== data.id);
      } else {
        // Si el checkbox no estaba seleccionado, se agrega al estado
        return [...prevCheckboxes, { ...data, percentage: 0 }];
      }
    });
    setModifiedValues((prevModifiedValues:any) => {
      if (prevModifiedValues.map(({ user_id }:{user_id:any}) => user_id).includes(data.id)) {
        // Si el checkbox ya estaba seleccionado, se remueve del estado
        return prevModifiedValues.filter(({ user_id }:{user_id:any}) => user_id !== data.id);
      } else {
        // Si el checkbox no estaba seleccionado, se agrega al estado
        return [...prevModifiedValues, { user_id: data.id, percentage: 0 }];
      }
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3 items-center font-normal w-full">
      <div className="flex gap-6 items-center">
        <input
          type="checkbox"
          checked={checkboxes
            .map(({ id }: { id: number }) => id)
            .includes(data.id)}
          onChange={() => handleCheckboxChange(data)}
          className="checkbox checkbox-xs checkbox-info"
        />
        <div className="user bg-[#1473E6] rounded-full w-[25px] h-[25px] max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] flex items-center justify-center">
          <p className="text-white text-xs font-normal text-center">
            {data?.profile?.first_name[0]}
          </p>
        </div>
        <div>
          <p className="text-xs">{data?.profile?.first_name}</p>
        </div>
      </div>

      <div>
        <p className="text-xs">{data.email}</p>
      </div>
    </div>
  );
};

export default UserItemListTeams;
