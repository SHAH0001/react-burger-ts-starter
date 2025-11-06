import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor-item.module.css';

type TBurgerConstructorItemProps = {
  ingredient: TIngredient;
};

export const BurgerConstructorItem = ({
  ingredient,
}: TBurgerConstructorItemProps): React.JSX.Element => {
  return (
    <div className={`${styles.burger_constructor_wrapper} mb-4`}>
      <DragIcon type="primary" />
      <div className={styles.burger_constructor_item}>
        <img src={ingredient.image_mobile} alt={ingredient.name} />
        <div className={`${styles.burger_constructor_name} text text_type_main-small`}>
          {ingredient.name}
        </div>
        <div className="mr-1">{ingredient.price}</div>
        <CurrencyIcon type="primary" className="mr-5" />
        <DeleteIcon type="primary" />
      </div>
    </div>
  );
};
