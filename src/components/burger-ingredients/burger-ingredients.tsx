import { Tab } from '@krgaa/react-developer-burger-ui-components';
// import { useEffect, useState } from 'react';

import { BurgerIngredient } from './burger-ingredient/burger-ingredient';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  console.log('BurgerIngredients: ', ingredients);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const fillings = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  return (
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
            <BurgerIngredient key={bun._id} ingredient={bun} />
          ))}
        </div>
        <div className="text text_type_main-medium">Начинки</div>
        <div className={styles.ingredients}>
          {fillings.map((filling) => (
            <BurgerIngredient key={filling._id} ingredient={filling} />
          ))}
        </div>
        <div className="text text_type_main-medium">Соусы</div>
        <div className={styles.ingredients}>
          {sauces.map((sauce) => (
            <BurgerIngredient key={sauce._id} ingredient={sauce} />
          ))}
        </div>
      </div>
    </section>
  );
};
