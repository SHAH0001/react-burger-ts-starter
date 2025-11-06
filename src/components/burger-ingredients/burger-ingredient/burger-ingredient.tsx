import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  onDataSubmit: (id: TIngredient['_id']) => void;
};

// const handleClick = (id: TIngredient['_id']): void => {
//   onDataSubmit(id);
// };

export const BurgerIngredient = ({
  ingredient,
  onDataSubmit,
}: TBurgerIngredientProps): React.JSX.Element => {
  return (
    <div
      onClick={() => onDataSubmit(ingredient._id)}
      className={`${styles.ingredient} mb-10`}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        {ingredient.price}
        <CurrencyIcon type="primary" className="ml-1" />
      </div>
      <div className={styles.name}>{ingredient.name}</div>
    </div>
  );
};
