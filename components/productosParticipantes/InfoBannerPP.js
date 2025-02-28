import SvgPP from "./SvgPP";

const InfoBannerPP = () => {

    return (
        <div className="flex flex-col gap-3 -mb-12">
            <div className="grid grid-cols-7 mt-6">
                <div className="grid grid-cols-1 lg:col-span-6 col-span-7 gap-6 w-full lg:px-6">
                    <div className="w-full p-1 h-1/2 flex justify-center items-center rounded-lg">
                        <div className="flex items-center ml-12 mr-12">
                            <figure className="w-[50px]">
                                <img src="https://res.cloudinary.com/dechrcyu3/image/upload/v1740763789/Modo_de_aislamiento_onct8d.png" />
                            </figure>
                        </div>

                        <div className="flex items-center ml-12 mr-12">
                            <figure className="w-[150px]">
                                <img src="https://res.cloudinary.com/dechrcyu3/image/upload/v1740763789/Group_1000006047_rk81oi.png" />
                            </figure>
                        </div>

                        <div className="flex items-center ml-12 mr-12">
                            <figure className="w-[50px]">
                                <img src="https://res.cloudinary.com/dechrcyu3/image/upload/v1740763789/Modo_de_aislamiento_1_jkkff9.png" />
                            </figure>
                        </div>

                        <div className="flex flex-col items-center gap-2 mt-8">
                            <div className="w-[3px] h-10 bg-black" />
                            <p className="pl-5 w-[100px] xl:text-base font-semibold">All apps</p>
                        </div>


                        <div className="flex items-center ml-12 mr-12">
                            <figure className="w-[50px]">
                                <img src="https://res.cloudinary.com/dechrcyu3/image/upload/v1740763790/Group_1000006048_grxfk8.png" />
                            </figure>
                        </div>

                        <div className="flex items-center ml-12 mr-12">
                            <figure className="w-[50px]">
                                <img src="https://res.cloudinary.com/dechrcyu3/image/upload/v1740763789/Adobe_Express_logo_1_v2ayo2.png" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoBannerPP;
