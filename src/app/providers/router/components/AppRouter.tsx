import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => {
  const elements = useRoutes(Object.values(routeConfig));

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="page-wrapper">{elements}</div>
    </Suspense>
  );
};

export default AppRouter;
