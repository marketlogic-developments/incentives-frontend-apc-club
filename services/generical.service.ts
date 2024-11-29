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
  content: T;
}

export const HandleError = (err: any) => {
  const { code, message } = err?.response.detail;

  return null;
};
