import { NavLink } from 'react-router-dom';

import styles from './profile-nav.module.css';

export const ProfileNav = (): React.JSX.Element => {
  return (
    <nav>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${styles.active_link} ${styles.link} text text_type_main-default`
            : `${styles.link} text text_type_main-default`
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/order-history"
        className={({ isActive }) =>
          isActive
            ? `${styles.active_link} ${styles.link} text text_type_main-default`
            : `${styles.link} text text_type_main-default`
        }
      >
        История заказов
      </NavLink>
      <div className={`${styles.link} text text_type_main-default`}>Выход</div>
    </nav>
  );
};
