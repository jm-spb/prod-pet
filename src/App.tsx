import { Link, Route, Routes } from 'react-router-dom';
import './index.scss';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <div className="app">
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>About</Link>
      <Routes>
        <Route
          element={<MainPage />}
          path="/"
        />
        <Route
          element={<AboutPage />}
          path="/about"
        />
      </Routes>
    </div>
  );
}

export default App;
