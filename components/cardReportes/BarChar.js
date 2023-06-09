import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { getRelativePosition } from "chart.js/helpers";

const BarChar = () => {
    const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
      }

  return (
    <div className="w-full">
      <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    </div>
  );
};

export default BarChar;
