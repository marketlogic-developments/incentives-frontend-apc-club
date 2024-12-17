import { InterrogationIconCircle } from 'public/assets/Icons/CircleIcons/CircleIcons';
import React, { FC, MouseEventHandler } from 'react';

interface Props{
    action: MouseEventHandler<HTMLDivElement>
}

const DataNotFound:FC<Props> = ({action}) => {
    return (
        <div className='flex flex-col w-full my-20 justify-center items-center gap-3'>
            <div onClick={action} className='cursor-pointer'>
                <InterrogationIconCircle/>
            </div>
            <p className=''>No hay datos para mostrar <br/> <b>Recargue nuevamente</b></p>
        </div>
    );
};

export default DataNotFound;