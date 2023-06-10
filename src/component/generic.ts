import axios, { AxiosInstance } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
interface props{
    method: HttpMethod;
    url: string;
    data?: any;
}
interface GenericFetch<T>{
    (x:props): T extends string? Promise<string> :Promise<T[]>
    //   (url:string): Promise<T[]> 
}
 
export let fn:GenericFetch<any>= async ({method,url,data})=>{
    try{
const response = await (axios[method] as any)(url, data);
  
  console.log('response.data',response.data)
  return response.data;
}catch(error:any){
    console.log('error occurs while fetching data',error)
}
      
} 