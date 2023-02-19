import Cookies from 'js-cookie';

export const TOKEN_KEY = 'value';

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

export const getToken = (): string => {
  return Cookies.get(TOKEN_KEY) ?? '';
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
