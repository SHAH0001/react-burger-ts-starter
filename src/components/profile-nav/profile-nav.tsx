import { logout } from '@/services/user/actions';
import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './profile-nav.module.css';

export const ProfileNav = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const localLogout = async (): Promise<void> => {
    return fetch(`${serverUrl}auth/logout`, {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkResponse)
      .then(() => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  };

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
        to="/order-history"
        className={({ isActive }) =>
          isActive
            ? `${styles.active_link} ${styles.link} text text_type_main-default`
            : `${styles.link} text text_type_main-default`
        }
      >
        История заказов
      </NavLink>
      <div
        onClick={localLogout}
        className={`${styles.link} text text_type_main-default`}
      >
        Выход
      </div>
    </nav>
  );
};
