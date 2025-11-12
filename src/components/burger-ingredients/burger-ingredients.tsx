import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { BurgerIngredient } from './burger-ingredient/burger-ingredient';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectIngredient, setSelectIngredient] = useState<TIngredient | null>(null);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const fillings = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  const getIngredientId = (id: TIngredient['_id']): void => {
    const findIngredient = ingredients.find((ingredient) => ingredient._id === id);
    if (!findIngredient) {
      return;
    }

    setSelectIngredient(findIngredient);
    setIsModalOpen(true);
  };

  const onclose = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab
              value="bun"
              active={true}
              onClick={() => {
                /* TODO */
              }}
            >
              Булки
            </Tab>
            <Tab
              value="main"
              active={false}
              onClick={() => {
                /* TODO */
              }}
            >
              Начинки
            </Tab>
            <Tab
              value="sauce"
              active={false}
              onClick={() => {
                /* TODO */
              }}
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.container}>
          <div className="text text_type_main-medium mt-10">Булки</div>
          <div className={styles.ingredients}>
            {buns.map((bun) => (
              <BurgerIngredient
                getIngredientId={getIngredientId}
                key={bun._id}
                ingredient={bun}
              />
            ))}
          </div>
          <div className="text text_type_main-medium">Начинки</div>
          <div className={styles.ingredients}>
            {fillings.map((filling) => (
              <BurgerIngredient
                getIngredientId={getIngredientId}
                key={filling._id}
                ingredient={filling}
              />
            ))}
          </div>
          <div className="text text_type_main-medium">Соусы</div>
          <div className={styles.ingredients}>
            {sauces.map((sauce) => (
              <BurgerIngredient
                getIngredientId={getIngredientId}
                key={sauce._id}
                ingredient={sauce}
              />
            ))}
          </div>
        </div>
      </section>
      {isModalOpen && selectIngredient && (
        <Modal title={'Детали ингредиента'} onclose={onclose}>
          <IngredientDetails selectIngredient={selectIngredient} />
        </Modal>
      )}
    </>
  );
};
