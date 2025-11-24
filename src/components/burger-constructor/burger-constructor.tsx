import {
  addIngredient,
  attachBun,
  removeIngredient,
} from '@/services/burgerConstructor/actions';
import {
  addCounterIngredient,
  removeCounterIngredient,
  setBuns,
} from '@/services/ingredients/actions';
import {
  CurrencyIcon,
  LockIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderCost, setOrderCost] = useState(0);
  const dispatch = useDispatch();
  const bun = useSelector<RootState, TIngredient>(
    (state): TIngredient => state.burgerConstructor.bun as TIngredient
  );

  const burgerConstructor = useSelector<RootState, TIngredient[]>(
    (state): TIngredient[] => state.burgerConstructor.burgerConstructor as TIngredient[]
  );

  const [, dropRefBurgerConstructor] = useDrop(() => ({
    accept: 'ingredient',
    drop(ingredient: TIngredient): void {
      const constructorIngredient = {
        ...ingredient,
        key: uuidv4(),
      };
      setOrderCost((item) => item + ingredient.price);
      dispatch(addIngredient(constructorIngredient));
      dispatch(addCounterIngredient(ingredient._id));
    },
  }));

  const [{ isOverUp }, dropRefEmptyUpBun] = useDrop(() => ({
    accept: 'bun',
    drop(ingredient: TIngredient): void {
      dispatch(attachBun(ingredient));
      dispatch(setBuns(ingredient._id));
    },
    collect: (monitor) => ({
      isOverUp: monitor.isOver(),
    }),
  }));

  const [{ isOverDown }, dropRefEmptyDownBun] = useDrop(() => ({
    accept: 'bun',
    drop(ingredient: TIngredient): void {
      dispatch(attachBun(ingredient));
      dispatch(setBuns(ingredient._id));
    },
    collect: (monitor) => ({
      isOverDown: monitor.isOver(),
    }),
  }));

  const [, dropRefUpBun] = useDrop(() => ({
    accept: 'bun',
    drop(ingredient: TIngredient): void {
      dispatch(attachBun(ingredient));
      dispatch(setBuns(ingredient._id));
    },
  }));

  const [, dropRefDownBun] = useDrop(() => ({
    accept: 'bun',
    drop(ingredient: TIngredient): void {
      dispatch(attachBun(ingredient));
      dispatch(setBuns(ingredient._id));
    },
  }));

  const onclose = (): void => {
    setIsModalOpen(false);
  };

  const placeOrder = (): void => {
    setIsModalOpen(true);
  };

  const deleteIngredient = (
    id: TIngredient['_id'],
    key: TIngredient['key'],
    price: TIngredient['price']
  ): void => {
    setOrderCost((item) => item - price);
    dispatch(removeIngredient(key));
    dispatch(removeCounterIngredient(id));
  };

  let burgerConstructorItems;
  if (burgerConstructor.length > 0) {
    burgerConstructorItems = burgerConstructor.map((ingredient, index) => (
      <BurgerConstructorItem
        key={ingredient.key}
        ingredient={ingredient}
        index={index}
        deleteIngredient={deleteIngredient}
      />
    ));
  } else {
    burgerConstructorItems = (
      <div className={`${styles.choose_filling} text text_type_main-small`}>
        Выберите начинку
      </div>
    );
  }

  return (
    <>
      <section className={styles.burger_constructor}>
        {bun ? (
          <div
            ref={(el) => {
              dropRefUpBun(el);
            }}
            className={`${styles.bun_top} mb-4 text text_type_main-small`}
          >
            <img src={bun.image_mobile} alt={bun.name} />
            <div className="mr-5">{bun.name} (верх)</div>
            <div className="mr-1">{bun.price}</div>
            <CurrencyIcon type="primary" className="mr-5" />
            <LockIcon type="secondary" />
          </div>
        ) : (
          <div
            ref={(el) => {
              dropRefEmptyUpBun(el);
            }}
            className={`${styles.empty_bun_top} mb-4 text text_type_main-small`}
            style={{ border: isOverUp || isOverDown ? '1px dashed blue' : '0px' }}
          >
            Выберите булки
          </div>
        )}
        <div
          ref={(el) => {
            dropRefBurgerConstructor(el);
          }}
          className={styles.container}
        >
          {burgerConstructorItems}
        </div>
        {bun ? (
          <div
            ref={(el) => {
              dropRefDownBun(el);
            }}
            className={`${styles.bun_bottom} mt-4 text text_type_main-small`}
          >
            <img src={bun.image_mobile} alt={bun.name} />
            <div className="mr-5">{bun.name} (низ)</div>
            <div className="mr-1">{bun.price}</div>
            <CurrencyIcon type="primary" className="mr-5" />
            <LockIcon type="secondary" />
          </div>
        ) : (
          <div
            ref={(el) => {
              dropRefEmptyDownBun(el);
            }}
            className={`${styles.empty_bun_bottom} mt-4 text text_type_main-small`}
            style={{ border: isOverUp || isOverDown ? '1px dashed blue' : '0px' }}
          >
            Выберите булки
          </div>
        )}
        <div className={`${styles.place_order} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <div className="text text_type_digits-medium mr-1">{orderCost}</div>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            onClick={() => placeOrder()}
            size="large"
            type="primary"
            htmlType={'button'}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpen && (
        <Modal onclose={onclose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
