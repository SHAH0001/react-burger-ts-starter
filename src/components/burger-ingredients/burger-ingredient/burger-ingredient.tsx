import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  getIngredientId: (id: TIngredient['_id']) => void;
};

export const BurgerIngredient = ({
  ingredient,
  getIngredientId,
}: TBurgerIngredientProps): React.JSX.Element => {
  const [, dragRef] = useDrag({
    type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragStart: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(el) => {
        dragRef(el);
      }}
      onClick={() => getIngredientId(ingredient._id)}
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
