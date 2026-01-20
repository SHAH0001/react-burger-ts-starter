import { ProfileNav } from '@/components/profile-nav/profile-nav';

import styles from './order-history.module.css';

export const OrderHistory = (): React.JSX.Element => {
  return (
    <div className={styles.order_history}>
      <div className={styles.order_history_wrapper}>
        <ProfileNav />
        <div>История заказов</div>
      </div>
    </div>
  );
};

export default OrderHistory;
