import {
  CurrencyIcon,
  // LockIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [{ isOver }, dropRef] = useDrop({
  //   accept: 'bun',
  //   drop(ingredient) {
  //     console.log('useDrop: ', ingredient);
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //   }),
  // });

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'bun',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Collect the 'isOver' state
    }),
  }));

  // const getFirstBun = ingredients.find((item) => item.type === 'bun');
  const ingredientsWithoutBuns = ingredients.filter((item) => item.type !== 'bun');

  const onclose = (): void => {
    setIsModalOpen(false);
  };

  const placeOrder = (): void => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className={styles.burger_constructor}>
        {/* <div className={`${styles.bun_top} mb-4 text text_type_main-small`}>
          <img src={getFirstBun?.image_mobile} alt={getFirstBun?.name} />
          <div className="mr-5">{getFirstBun?.name} (верх123)</div>
          <div className="mr-1">{getFirstBun?.price}</div>
          <CurrencyIcon type="primary" className="mr-5" />
          <LockIcon type="secondary" />
        </div> */}
        {/* dragging */}
        <div className={isOver ? 'dragging' : ''}>
          <div
            ref={(el) => {
              dropRef(el);
            }}
            className={`${styles.empty_bun_top} mb-4 text text_type_main-small`}
            style={{ border: isOver ? '1px dashed blue' : '0px' }}
          >
            Выберите булки
          </div>
        </div>
        <div className={styles.container}>
          {ingredientsWithoutBuns.map((ingredient) => (
            <BurgerConstructorItem key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <div className={`${styles.empty_bun_bottom} mt-4 text text_type_main-small`}>
          Выберите булки
        </div>
        {/* <div className={`${styles.bun_bottom} mt-4 text text_type_main-small`}>
          <img src={getFirstBun?.image_mobile} alt={getFirstBun?.name} />
          <div className="mr-5">{getFirstBun?.name} (низ)</div>
          <div className="mr-1">{getFirstBun?.price}</div>
          <CurrencyIcon type="primary" className="mr-5" />
          <LockIcon type="secondary" />
        </div> */}
        <div className={`${styles.place_order} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <div className="text text_type_digits-medium mr-1">610</div>
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
