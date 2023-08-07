import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteObject } from 'react-router-dom';

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
};

/* 
TODO: refactor:
export const routerConfig: Array<RouteProps> = [
    {
        path: AppRoutes.MAIN,
        element: <MainPage />
    },
    {
        path: AppRoutes.ABOUT,
        element: <AboutPage />
    }
]
*/
