import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { MainPageLazy } from './pages/MainPage/MainPage.lazy';
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy';
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            element={<MainPageLazy />}
            path="/"
          />
          <Route
            element={<AboutPageLazy />}
            path="/about"
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
