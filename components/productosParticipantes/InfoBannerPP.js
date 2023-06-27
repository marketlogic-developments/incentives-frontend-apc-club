import SvgPP from "./SvgPP";

const InfoBannerPP = () => {
  const segments = [
    {
      url: "/assets/dashboard/cc.webp",
      text: "Creative Cloud",
      subtext: "All Renewals  |  Acrobat Pro  |  Acrobat Sign",
    },
    {
      url: "/assets/dashboard/DC.webp",
      text: "Document Cloud",
      subtext: "Complete Versión  |  All Renewals",
    },
  ];

  const secuency = [0, 1, 1, 0, 1, 1, 1, 1];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-7">
        <div>
          <SvgPP />
        </div>
        <div className="grid grid-cols-2 col-span-6 gap-6 w-full px-6">
          {segments.map((item) => (
            <div>
              <div className="w-full bg-[#F4F4F4] p-1 h-1/2 flex justify-center items-center rounded-lg">
                <div className="flex items-center">
                  <figure className="w-[50px]">
                    <img src={item.url} />
                  </figure>
                  <p className="xl:!text-base font-semibold">{item.text}</p>
                </div>
              </div>
              <div className="h-1/2 w-full flex justify-center items-center">
                <p className="!text-xs font-semibold">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7">
        <div className="flex flex-col w-full items-center gap-6 p-6 bg-[#E0E0E0] rounded-lg [&_p]:!text-xs [&_p]:font-semibold">
          <p>DC</p>
          <hr className="w-full" />
          <p>Teams</p>
          <hr className="w-full" />
          <p>Enterprise</p>
          <hr className="w-full" />
          <p>Education</p>
        </div>
        <div className="grid grid-cols-2 col-span-6 place-items-center px-6 tableProducts">
          {secuency.map((item) => (
            <div className="w-full flex justify-center items-center border-b h-full">
              {item === 1 && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.48606 0 0 4.48606 0 10C0 15.5139 4.48606 20 10 20C15.5139 20 20 15.5139 20 10C20 4.48606 15.5139 0 10 0ZM8.17308 15.0183L4.29808 10.712L5.44183 9.68269L8.13414 12.674L14.5192 5.07019L15.699 6.05769L8.17308 15.0183Z"
                    fill="#EB1000"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoBannerPP;
