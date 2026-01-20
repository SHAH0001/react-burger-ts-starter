import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import type { RootState } from '../../services/store';
import type { TUser } from '@/utils/user';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector<RootState, TUser>((state): TUser => state.user.user as TUser);
  let showMenu;
  if (user) {
    showMenu = (
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${styles.active_link} ${styles.link} ${styles.link_position_last}`
            : `${styles.link} ${styles.link_position_last}`
        }
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">{user.name}</p>
          </>
        )}
      </NavLink>
    );
  } else {
    showMenu = (
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? `${styles.active_link} ${styles.link} ${styles.link_position_last}`
            : `${styles.link} ${styles.link_position_last}`
        }
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </>
        )}
      </NavLink>
    );
  }
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {/* Тут должны быть ссылки, а не например кнопки или абзацы */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.active_link} ${styles.link}` : `${styles.link}`
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive
                ? `${styles.active_link} ${styles.link} ml-10`
                : `${styles.link} ml-10`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <NavLink to="/">
          <div className={styles.logo}>
            <Logo />
          </div>
        </NavLink>
        {showMenu}
      </nav>
    </header>
  );
};
