import React from "react";

const Whatsapp = ({ width = 40, height = 40 }) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke="#25D366"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="iconWhatsApp"
    >
      <path d="M4.256 16.594a8.99 8.99 0 1 1 3.15 3.15v0l-3.112.882a.74.74 0 0 1-.919-.92l.881-3.112Z" />
      <path d="M7.5 9.703A2.24 2.24 0 0 1 9.75 7.5h.328a.74.74 0 0 1 .638.366l.694 1.153a.73.73 0 0 1 .028.722l-.44.9a3.375 3.375 0 0 0 2.362 2.362l.9-.44a.732.732 0 0 1 .722.028l1.153.693a.74.74 0 0 1 .365.638v.328a2.24 2.24 0 0 1-2.203 2.25A6.74 6.74 0 0 1 7.5 9.703v0Z" />
    </svg>
  );
};

export default Whatsapp;
