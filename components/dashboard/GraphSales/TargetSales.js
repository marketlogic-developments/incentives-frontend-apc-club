import PieChart from "./PieChart";

const TargetSales = ({ data }) => {
  console.log(data);
  function formatNumber(number) {
    const formattedNumber =
      number >= 1000000
        ? (number / 1000000).toFixed(1) + "M"
        : number >= 1000
        ? (number / 1000).toFixed(1) + "K"
        : number.toLocaleString("en-US");
    return formattedNumber;
  }

  const sales = {
    renewal: data
      .filter(({ business_type }) => business_type === "Renewal")
      .map(({ total_sales_amount }) => Number(total_sales_amount))
      .reduce((currently, preValue) => currently + preValue, 0),

    percentageRenewal:
      (data
        .filter(({ business_type }) => business_type === "Renewal")
        .map(({ total_sales_amount }) => Number(total_sales_amount))
        .reduce((currently, preValue) => currently + preValue, 0) *
        100) /
      Math.round(
        data
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((currently, preValue) => currently + preValue, 0)
      ),
    newBusiness: data
      .filter(({ business_type }) => business_type === "New Business")
      .map(({ total_sales_amount }) => Number(total_sales_amount))
      .reduce((currently, preValue) => currently + preValue, 0),
    percentageNewbusiness:
      (data
        .filter(({ business_type }) => business_type === "New Business")
        .map(({ total_sales_amount }) => Number(total_sales_amount))
        .reduce((currently, preValue) => currently + preValue, 0) *
        100) /
      Math.round(
        data
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((currently, preValue) => currently + preValue, 0)
      ),
  };

  return (
    <div className="flex flex-col w-full p-3 gap-6 targetDashboard relative">
      <div className="flex justify-between">
        <h3 className="font-bold xl:!text-xl lg:!text-sm">
          {data[0]?.business_unit}
        </h3>
        <p className="xl:!text-2xl lg:!text-xl font-semibold">
          {formatNumber(
            Math.round(
              data
                .map(({ total_sales_amount }) => Number(total_sales_amount))
                .reduce((currently, preValue) => currently + preValue, 0)
            )
          )}
        </p>
      </div>
      <div className="flex justify-around my-auto">
        <PieChart
          sales={sales.renewal}
          percentageTotal={sales.percentageRenewal}
          color={"#232B2F"}
          type={"Renewal"}
        />
        <PieChart
          sales={sales.newBusiness}
          percentageTotal={sales.percentageNewbusiness}
          color={"#21A5A2"}
          type={"New Business"}
        />
      </div>
    </div>
  );
};

export default TargetSales;
