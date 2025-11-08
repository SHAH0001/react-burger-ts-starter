import { Modal } from '../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  onclose: () => void;
  selectIngredient: TIngredient;
};

export const IngredientDetails = ({
  onclose,
  selectIngredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  return (
    <Modal onclose={onclose} title="Детали ингредиента">
      <div className={styles.modal}>
        <img src={selectIngredient.image_large} alt={selectIngredient.name} />
        <div className="text text_type_main-medium mt-4 mb-8">
          {selectIngredient.name}
        </div>
        <div
          className={`${styles.nutritional_value} text text_type_main-default text_color_inactive`}
        >
          <div className="mr-5">
            <div>Калории,ккал</div>
            <div className={styles.energy_value}>{selectIngredient.calories}</div>
          </div>
          <div className="mr-5">
            <div>Белки, г</div>
            <div className={styles.energy_value}>{selectIngredient.proteins}</div>
          </div>
          <div className="mr-5">
            <div>Жиры, г</div>
            <div className={styles.energy_value}>{selectIngredient.fat}</div>
          </div>
          <div>
            <div>Углеводы, г</div>
            <div className={styles.energy_value}>{selectIngredient.carbohydrates}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
