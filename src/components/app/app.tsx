import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Ingredients } from '@/pages/ingredients/ingredients';
import { Login } from '@/pages/login/login';
import { Registration } from '@/pages/registration/registration';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { loadingIngredients } from '@/services/ingredients/actions';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const ingredients = useSelector<RootState, TIngredient[]>(
    (state): TIngredient[] => state.ingredients.ingredients as TIngredient[]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(loadingIngredients());
  }, []);

  const onclose = (): void => {
    console.log('onclose');
  };

  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  console.log('location', location);

  if (ingredients.length === 0) {
    return <Preloader />;
  } else {
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
  }
};

export default App;
