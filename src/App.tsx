import { Link, Route, Routes } from 'react-router-dom';
import './index.scss';
import { MainPageLazy } from './pages/MainPage/MainPage.lazy';
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy';
import { Suspense } from 'react';

function App() {
  return (
    <div className="app">
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
