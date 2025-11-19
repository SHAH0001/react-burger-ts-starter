import { loadingIngredients } from '@/services/ingredients/actions';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const ingredients = useSelector<RootState, TIngredient[]>(
    (state): TIngredient[] => state.ingredients.ingredients as TIngredient[]
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(loadingIngredients());
  }, []);

  if (ingredients.length === 0) {
    return <Preloader />;
  } else {
    return (
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </main>
      </div>
    );
  }
};

export default App;
