import { logout } from '@/services/user/actions';
import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import type { TLogoutResponse } from '@/services/types';
import type { TLocationState } from '@/utils/types';

import styles from './profile-nav.module.css';

export const ProfileNav = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as TLocationState;
  const from = state?.from?.pathname ?? '/';

  const localLogout = async (): Promise<void> => {
    try {
      const response = await fetch(`${serverUrl}auth/logout`, {
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await checkResponse<TLogoutResponse>(response);

      if (!data.success) {
        throw new Error('Logout failed');
      }

      dispatch(logout());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      void navigate(from, { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(message);
    }
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
      <button
        onClick={() => void localLogout()}
        className={`${styles.link} ${styles.button} text text_type_main-default`}
      >
        Выход
      </button>
    </nav>
  );
};
