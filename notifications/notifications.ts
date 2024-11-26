import Swal, { SweetAlertOptions } from "sweetalert2";

/**
 * Muestra un popup estándar.
 */
export const PopupSwal = ({
  icon = "success",
  ...props
}: SweetAlertOptions): void => {
  Swal.fire({
    title: props.title || "", // Por si `title` no está definido
    html: props.html || "", // Por si `html` no está definido
    icon: icon,
    confirmButtonColor: props.confirmButtonColor || "#3085d6", // Valor por defecto
    confirmButtonText: props.confirmButtonText || "Aceptar",
  });
};

/**
 * Muestra una notificación tipo toast.
 */
export const NotiSwal = ({
  position = "top",
  timer = 3000,
  ...props
}: SweetAlertOptions): void => {
  // Crea una instancia personalizada con mixin
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // Llama al método `fire` de la instancia personalizada
  Toast.fire({
    icon: props.icon || "info", // Valor por defecto
    text: props.text || "Notificación", // Valor por defecto
  });
};
