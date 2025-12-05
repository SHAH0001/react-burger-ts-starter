import { useSelector } from 'react-redux';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element => {
  const modalIngredient = useSelector<RootState, TIngredient>(
    (state): TIngredient => state.ingredients.modalIngredient as TIngredient
  );
  console.log('modalIngredient: ', modalIngredient);
  return (
    <div className={styles.modal}>
      <img src={modalIngredient.image_large} alt={modalIngredient.name} />
      <div className="text text_type_main-medium mt-4 mb-8">{modalIngredient.name}</div>
      <div
        className={`${styles.nutritional_value} text text_type_main-default text_color_inactive`}
      >
        <div className="mr-5">
          <div>Калории,ккал</div>
          <div className={styles.energy_value}>{modalIngredient.calories}</div>
        </div>
        <div className="mr-5">
          <div>Белки, г</div>
          <div className={styles.energy_value}>{modalIngredient.proteins}</div>
        </div>
        <div className="mr-5">
          <div>Жиры, г</div>
          <div className={styles.energy_value}>{modalIngredient.fat}</div>
        </div>
        <div>
          <div>Углеводы, г</div>
          <div className={styles.energy_value}>{modalIngredient.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
};
