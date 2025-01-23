import React from 'react';

const regionColor = (region:string) => {
    switch(region){
        case "Brazil":
            return "#21A5A2"
        case "América del Sur":
        case "SOLA":
            return "#eb1000"
        case "América del Norte":
        case "NOLA":
            return "#1473E6"
        case "Mexico":
            return "#FFA213"
    }
};

export default regionColor;