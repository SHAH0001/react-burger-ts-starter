import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor-item.module.css';

type TBurgerConstructorItemProps = {
  ingredient: TIngredient;
  deleteIngredient: (
    id: TIngredient['_id'],
    key: TIngredient['key'],
    price: TIngredient['price']
  ) => void;
};

export const BurgerConstructorItem = ({
  ingredient,
  deleteIngredient,
}: TBurgerConstructorItemProps): React.JSX.Element => {
  return (
    <div
      className={`${styles.burger_constructor_wrapper} mb-4 text text_type_main-small`}
    >
      <DragIcon type="primary" />
      <div className={styles.burger_constructor_item}>
        <img src={ingredient.image_mobile} alt={ingredient.name} />
        <div className={styles.burger_constructor_name}>{ingredient.name}</div>
        <div className=" mr-1">{ingredient.price}</div>
        <CurrencyIcon type="primary" className="mr-5" />
        <DeleteIcon
          type="primary"
          onClick={() =>
            deleteIngredient(ingredient._id, ingredient.key, ingredient.price)
          }
        />
      </div>
    </div>
  );
};
