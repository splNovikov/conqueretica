import { IRoute } from '../interfaces';

type AppRoutes = 'default' | 'signIn' | 'signUp' | 'links' | 'dashboard';

export const appRoutes: Record<AppRoutes, IRoute> = {
  default: {
    path: 'links',
  },

  signIn: {
    path: 'sign-in',
  },
  signUp: {
    path: 'sign-up',
  },
  links: {
    path: 'links',
  },
  dashboard: {
    path: 'dashboard',
  },
};
