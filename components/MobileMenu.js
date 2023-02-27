import { useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/reducers/users.reducer";

function MobileMenu({ locations, locationsVendedor, locationsPP, locationsPA }) {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";

  const router = useRouter();
  const ruta = router.query;
  const [isOpen, setIsOpen] = useState(false);

  const menu = useMemo(() => {
    if (user?.user?.roleId === 1) {
      return locations.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                typeof window !== "undefined" &&
                window.location.pathname === page
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
    } else if (user?.user?.roleId === 2) {
      return locationsPP.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                typeof window !== "undefined" &&
                window.location.pathname === page
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
    } else if (user?.user?.roleId === 3) {
      return locationsPA.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                typeof window !== "undefined" &&
                window.location.pathname === page
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
    } else if (user?.user?.roleId === 5) {
      return locationsVendedor.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                window.location.pathname === page
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
    }
  }, [locations, locationsVendedor, user]);

  useEffect(() => {
    if (Cookies.get("userDt") !== undefined) {
      dispatch(userLogin(JSON.parse(Cookies.get("userDt"))));
      setUser(JSON.parse(Cookies.get("userDt")));
    }
  }, [location]);

  if (location === "/" || location === "/[404]") {
    return <>{children}</>;
  }
  const href = (page) => {
    router.push(page);
  };

  const logout = () => {
    Cookies.remove("userDt");
    router.push("/");
  };

  return (
    <div>
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
          className="fixed top-0 left-0 w-full h-full menu-bg text-white py-10 text-center"
          onClick={() => setIsOpen(false)}
        >
          {menu}
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
