import axios, { AxiosError } from 'axios';

interface IArgsMutation<T> {
  method: string;
  data: T;
}

export const fetcherMutation = async <T>(
  url: string,
  { arg: options }: { arg: IArgsMutation<T> },
) => {
  try {
    const response = await axios(url, options);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }

    throw error;
  }
};
