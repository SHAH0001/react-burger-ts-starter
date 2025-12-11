import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFound = (): React.JSX.Element => {
  return (
    <div className={styles.not_found}>
      <div>Такой страницы нет</div>
      <Link to="/">На главную</Link>
    </div>
  );
};

export default NotFound;
