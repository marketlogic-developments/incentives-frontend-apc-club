import React from 'react';
import { LaptopToDo } from '../icons';

const Maintenance = ({icon = <LaptopToDo />, title = "Estamos trabajando" ,text = 'Próximamente...'}) => {
  return (
    <div className="grid justify-items-center mt-8">
      <LaptopToDo />
      <div className="">
        <h1 className="font-bold !text-4xl">{title}</h1>
        <p className="text-xl text-center">{text}</p>
      </div>
    </div>
  )
}

export default Maintenance