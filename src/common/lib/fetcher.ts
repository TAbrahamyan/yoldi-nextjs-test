import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axios = Axios.create({
  baseURL: 'https://frontend-test-api.yoldi.agency/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

type FetcherOptions = AxiosRequestConfig | undefined;

export interface ApiResponse<T> {
  data: T;
}

export const fetcher = async <T>(
  url: string,
  options?: FetcherOptions,
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios(url, options);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }

    throw error;
  }
};

export const fetcherMutation = async <T>(
  url: string,
  { arg: options }: { arg: FetcherOptions },
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios(url, options);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }

    throw error;
  }
};
