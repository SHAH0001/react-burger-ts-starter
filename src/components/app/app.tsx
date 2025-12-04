import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Ingredients } from '@/pages/ingredients/ingredients';
import { Login } from '@/pages/login/login';
import { Registration } from '@/pages/registration/registration';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const onclose = (): void => {
    // setIsModalOpen(false);
    console.log('onclose');
  };

  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  console.log('location', location);

  return (
    <>
      <AppHeader />
      <div className={styles.main}>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onclose={onclose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        <Routes location={state?.backgroundLocation ?? location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/ingredients/:id" element={<Ingredients />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
