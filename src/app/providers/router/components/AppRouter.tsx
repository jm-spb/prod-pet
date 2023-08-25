import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
  const elements = useRoutes(Object.values(routeConfig));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="page-wrapper">{elements}</div>
    </Suspense>
  );
};

export default AppRouter;
