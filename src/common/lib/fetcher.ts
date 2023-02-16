import axios, { AxiosError, AxiosRequestConfig } from 'axios';

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
