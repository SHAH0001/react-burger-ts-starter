import { useSelector } from 'react-redux';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@/utils/types';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const ingredients = useSelector<RootState, TIngredient[]>(
    (state): TIngredient[] => state.ingredients.ingredients as TIngredient[]
  );

  return (
    <div className={styles.app}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default Home;
