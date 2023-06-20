import SvgPP from "./SvgPP";

const InfoBannerPP = () => {
  const segments = [
    {
      url: "",
      text: "",
      subtext: "",
    },
    {
      url: "",
      text: "",
      subtext: "",
    },
  ];

  return (
    <div>
      <div>
        <div>
          <SvgPP />
        </div>
        <div className="grid grid-cols-2">
          {segments.map((item) => (
            <div>
              <div className="w-full bg-[#F4F4F4]">
                <div>
                  <figure>
                    <img></img>
                  </figure>
                  <p></p>
                </div>
              </div>
              <div>
                <p></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoBannerPP;
