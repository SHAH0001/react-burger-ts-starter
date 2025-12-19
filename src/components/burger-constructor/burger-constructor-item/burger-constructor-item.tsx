import { moveCard } from '@/services/burgerConstructor/actions';
import {
  ConstructorElement,
  // CurrencyIcon,
  // DeleteIcon,
  // DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { TIngredient } from '@utils/types';

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

  const [, drag] = useDrag({
    type: 'card',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="mb-4">
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image_mobile}
        handleClose={() =>
          deleteIngredient(ingredient._id, ingredient.key, ingredient.price)
        }
      />
    </div>
  );
};
