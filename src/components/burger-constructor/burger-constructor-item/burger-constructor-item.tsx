import { moveCard } from '@/services/burgerConstructor/actions';
import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor-item.module.css';

type TBurgerConstructorItemProps = {
  ingredient: TIngredient;
  index: number;
  deleteIngredient: (
    id: TIngredient['_id'],
    key: TIngredient['key'],
    price: TIngredient['price']
  ) => void;
};

export const BurgerConstructorItem = ({
  ingredient,
  index,
  deleteIngredient,
}: TBurgerConstructorItemProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'card',
    drop(ingredient: TIngredient): void {
      dispatch(moveCard(ingredient, index));
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${styles.burger_constructor_wrapper} mb-4 text text_type_main-small`}
      style={{ ...styles, opacity }}
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
