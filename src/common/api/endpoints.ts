export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/sign-up',
    LOGIN: '/auth/login',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
  },
  USER: {
    USERS: '/user',
    USER: (slug: string) => `/user/${slug}`,
  },
  IMAGE: {
    CREATE: '/image',
  },
};
