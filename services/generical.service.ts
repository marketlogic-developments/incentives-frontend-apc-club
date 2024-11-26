export interface GenericalPromise<T> {
  status: number;
  detail: string;
  result: T;
}

export interface ErrorPromise{
    code: number,
    detail:string
}

export const HandleError=()=>{
    
}