export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/sign-up',
    LOGIN: '/auth/login',
  },
  PROFILE: {
    GET: '/profile',
  },
  USER: {
    USERS: '/user',
    USER: (slug: string) => `/user/${slug}`,
  },
};
