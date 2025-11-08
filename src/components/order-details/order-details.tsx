import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import { Modal } from '../modal/modal';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  onclose: () => void;
};

export const OrderDetails = ({ onclose }: TOrderDetailsProps): React.JSX.Element => {
  return (
    <Modal onclose={onclose}>
      <div className={styles.modal}>
        <div className="text text_type_digits-large mb-8">034536</div>
        <div className="text text_type_main-medium mb-15">идентификатор заказа</div>
        <CheckMarkIcon type="primary" />
        <div className="text text_type_main-small mt-15 mb-2">
          Ваш заказ начали готовить
        </div>
        <div className="text text_type_main-default text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </div>
      </div>
    </Modal>
  );
};
