import { Suspense } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
  const elements = useRoutes(Object.values(routeConfig));

  return <Suspense fallback={<div>Loading...</div>}>{elements}</Suspense>;
};

export default AppRouter;
