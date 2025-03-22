import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const EyeObserver = () => {
  const router = useRouter();

  const dataUserSwitch = useSelector((state) => state.user.userSwitch);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = () => {
    const tokenAdmin=Cookies.get("prevSession")
    sessionStorage.removeItem("token")
    sessionStorage.setItem("token",tokenAdmin)
    Cookies.remove("prevSession")

    let timerInterval;
    Swal.fire({
      title: `Returning to the administrator user`,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        return window.location.replace("/dashboard");
      }
    });
  };

  const actionChangeOriginal = () =>
    Swal.fire({
      title: "You are in observer mode",
      text: "Back to your administrator user?",
      customClass: {
        icon: "no-border",
      },
      iconHtml:
        '<svg width="60" height="60" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.25C4.5 5.25 1.5 12 1.5 12s3 6.75 10.5 6.75S22.5 12 22.5 12s-3-6.75-10.5-6.75Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg>',
      showCancelButton: true,
      confirmButtonColor: "#1473E6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleSubmit();
      }
    });

  return (
    <div className="cursor-pointer" onClick={actionChangeOriginal}>
      <svg
        width="30"
        height="30"
        fill="none"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 5.25C4.5 5.25 1.5 12 1.5 12s3 6.75 10.5 6.75S22.5 12 22.5 12s-3-6.75-10.5-6.75Z"></path>
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
      </svg>
    </div>
  );
};

export default EyeObserver;
