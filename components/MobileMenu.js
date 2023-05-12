import { useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MobileMenu({
  locations,
  locationsVendedor,
  locationsPP,
  locationsPA,
}) {
  const [user, setUser] = useState({});
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";

  const router = useRouter();
  const ruta = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const userRedux = useSelector((state) => state.user.user);

  const menu = useMemo(() => {
    return locations.map(({ icon, page, text }, index) => {
      return (
        <div className="containerItemLayout" key={index}>
          <div
            className={
              typeof window !== "undefined" && window.location.pathname === page
                ? "itemLayoutSelect"
                : "itemLayout"
            }
            key={index}
            onClick={() => href(page)}
          >
            {icon}
            <p>{text}</p>
          </div>
        </div>
      );
    });

    s;
  }, [locations, user]);

  useEffect(() => {
    if (window.sessionStorage.getItem("infoDt") !== null) {
      setUser(JSON.parse(window.sessionStorage.getItem("infoDt")));
    }
  }, [location]);

  if (location === "/" || location === "/[404]") {
    return <>{children}</>;
  }
  const href = (page) => {
    router.push(page);
  };

  const logout = () => {
    window.sessionStorage.removeItem("infoDt");
    router.push("/");
  };

  return (
    <div className="menu_Mobile">
      <button
        className={`menu-button ${
          isOpen ? "menu-button-open" : ""
        } text-white px-3`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            width="46"
            height="46"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m18.75 5.25-13.5 13.5"></path>
            <path d="M18.75 18.75 5.25 5.25"></path>
          </svg>
        ) : (
          <svg
            width="46"
            height="46"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.75 12h16.5"></path>
            <path d="M3.75 6h16.5"></path>
            <path d="M3.75 18h16.5"></path>
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full menu-bg text-white py-20 text-center"
          onClick={() => setIsOpen(false)}
        >
          {menu}
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
