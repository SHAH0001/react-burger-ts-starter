import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [codeFromLetter, setCodeFromLetter] = useState('');
  // code from the letter
  return (
    <div className={styles.reset_password}>
      <div className="text text_type_main-large mb-6">Восстановление пароля</div>
      <Input
        icon="ShowIcon"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Пароль"
        type="password"
        value={password}
      />
      <div className="mt-6 mb-6">
        <Input
          name="codeFromLetter"
          onChange={(event) => setCodeFromLetter(event.target.value)}
          placeholder="Введите код из письма"
          value={codeFromLetter}
        />
      </div>
      <Button
        onClick={function fee() {}}
        size="small"
        type="primary"
        htmlType={'button'}
      >
        Восстановить
      </Button>
      <div className={styles.auth_reset}>
        <div className={styles.wrapper}>
          <div className="text text_type_main-default mb-4 mr-1">Вспомнили пароль?</div>
          <div className="text text_type_main-default text_color_inactive">
            <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
