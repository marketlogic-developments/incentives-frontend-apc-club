import Swal from "sweetalert2";

const alert = ({
  position = "top-end",
  background = "black",
  showConfirmButton = false,
  timer = 3000,
  timerProgressBar = true,
  icon = "question",
  title = "Title",
  customClass = {},
  width = "30%"
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    background: background,
    showConfirmButton: showConfirmButton,
    timer: timer,
    timerProgressBar: timerProgressBar,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return Toast.fire({
    icon: icon,
    title: "<p style='color:white'>" + title + "</p>",
    width:width,
    customClass: customClass,
  });
};

export { alert };