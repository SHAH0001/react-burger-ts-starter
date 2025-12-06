import { modalIngredient } from '@/services/ingredients/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element => {
  const ingredient = useSelector<RootState, TIngredient>(
    (state): TIngredient => state.ingredients.modalIngredient as TIngredient
  );

  const ingredients = useSelector<RootState, TIngredient[]>(
    (state): TIngredient[] => state.ingredients.ingredients as TIngredient[]
  );
  const { id } = useParams<'id'>();
  const dispatch = useDispatch();

  useEffect(() => {
    const findIngredient = ingredients.find((ingredient) => ingredient._id === id);
    if (!findIngredient) {
      return;
    }
    dispatch(modalIngredient(findIngredient));
  }, []);
  return (
    <div className={styles.modal}>
      <img src={ingredient?.image_large} alt={ingredient?.name} />
      <div className="text text_type_main-medium mt-4 mb-8">{ingredient?.name}</div>
      <div
        className={`${styles.nutritional_value} text text_type_main-default text_color_inactive`}
      >
        <div className="mr-5">
          <div>Калории,ккал</div>
          <div className={styles.energy_value}>{ingredient?.calories}</div>
        </div>
        <div className="mr-5">
          <div>Белки, г</div>
          <div className={styles.energy_value}>{ingredient?.proteins}</div>
        </div>
        <div className="mr-5">
          <div>Жиры, г</div>
          <div className={styles.energy_value}>{ingredient?.fat}</div>
        </div>
        <div>
          <div>Углеводы, г</div>
          <div className={styles.energy_value}>{ingredient?.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
};
