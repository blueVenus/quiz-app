import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface IRequestOptions {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}
interface IResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
class HttpClient {
  private readonly instance: AxiosInstance;
  constructor(baseURL?: string) {
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  }
  private handleSuccessResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }
  private handleErrorResponse(error: any): Promise<never> {
    console.error(error.message);
    return Promise.reject(error);
  }
  public async request<T = any>({
    url,
    method,
    data,
    params,
    headers,
  }: IRequestOptions): Promise<IResponse<T>> {
    const response = await this.instance.request<T>({
      url,
      method,
      data,
      params,
      headers,
    });
    return {
      code: response.status,
      message: response.statusText,
      data: response.data,
    };
  }
}

const http = new HttpClient();

export default http;
