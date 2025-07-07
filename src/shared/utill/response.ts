
export function  extractData<T = any>(res:any):T {
    return  res?.data?.data ?? res?.data;
}