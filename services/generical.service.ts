import { NotiSwal } from "notifications/notifications";
import Swal, { SweetAlertIcon } from "sweetalert2";

export interface GenericalPromise<T> {
  status: number;
  detail: string;
  result: T;
}

export interface ErrorPromise {
  code: number;
  detail: string;
}

export interface MultipleElements<T> {
  page_number: number;
  page_size: number;
  total_pages: number;
  total_record: number;
  content: T[];
}

export interface PaginatedElements<T> extends GenericalPromise<MultipleElements<T>> {}

export const HandleError = (err: any): void => {
  if (err.response) {
    const dataError = err?.response.data.detail;
    const code = err.status;
    let mess: string = "Error";

    if (Array.isArray(dataError)) {
      const { msg, type } = dataError[0];

      mess = msg;
    } else {
      const { code, message } = dataError;

      mess = message;
    }

    console.log(mess);

    NotiSwal({ icon: "error", text: mess });
  }

  if(err.code === "ERR_NETWORK"){
    NotiSwal({ icon: "warning", text: "Server error. Try again later." });
  }
  
};
