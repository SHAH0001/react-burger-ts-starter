import { modalIngredient } from '@/services/ingredients/actions';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('bun');

  const containerRef = useRef(null);
  const bunsRef = useRef(null);
  const fillingsRef = useRef(null);
  const saucesRef = useRef(null);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const fillings = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

  const getIngredientId = (id: TIngredient['_id']): void => {
    const findIngredient = ingredients.find((ingredient) => ingredient._id === id);
    if (!findIngredient) {
      return;
    }
    setIsModalOpen(true);
    dispatch(modalIngredient(findIngredient));
  };

  const onclose = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const container: HTMLElement | null = containerRef.current;
    if (!container) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    container.addEventListener('scroll', handleScroll);

    return () => {
      if (container) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScroll = useCallback(() => {
    const container: HTMLElement | null = containerRef.current;
    if (!container) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const containerTop = container.getBoundingClientRect().top;

    const refs = [
      { type: 'bun', node: bunsRef.current },
      { type: 'fillings', node: fillingsRef.current },
      { type: 'sauces', node: saucesRef.current },
    ];

    let loaclCurrentTab = currentTab;
    let inf = Infinity;

    refs.forEach(({ type, node }) => {
      if (!node) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const modulNumber = Math.abs(node.getBoundingClientRect().top - containerTop);

      if (modulNumber < inf) {
        inf = modulNumber;
        loaclCurrentTab = type;
      }
    });

    setCurrentTab(loaclCurrentTab);
  }, [currentTab]);

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab
              value="bun"
              active={currentTab === 'bun'}
              onClick={() => {
                /* TODO */
              }}
            >
              Булки
            </Tab>
            <Tab
              value="main"
              active={currentTab === 'fillings'}
              onClick={() => {
                /* TODO */
              }}
            >
              Начинки
            </Tab>
            <Tab
              value="sauce"
              active={currentTab === 'sauces'}
              onClick={() => {
                /* TODO */
              }}
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div ref={containerRef} className={styles.container}>
          <div ref={bunsRef} className="text text_type_main-medium mt-10">
            Булки
          </div>
          <div className={styles.ingredients}>
            {buns.map((bun) => (
              <BurgerIngredient
                getIngredientId={getIngredientId}
                key={bun._id}
                ingredient={bun}
              />
            ))}
          </div>
          <div ref={fillingsRef} className="text text_type_main-medium">
            Начинки
          </div>
          <div className={styles.ingredients}>
            {fillings.map((filling) => (
              <BurgerIngredient
                getIngredientId={getIngredientId}
                key={filling._id}
                ingredient={filling}
              />
            ))}
          </div>
          <div ref={saucesRef} className="text text_type_main-medium">
            Соусы
          </div>
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
      {isModalOpen && (
        <Modal title={'Детали ингредиента'} onclose={onclose}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
