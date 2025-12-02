import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { Registration } from '@/pages/registration/registration';
import { Routes, Route } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <>
      <AppHeader />
      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
