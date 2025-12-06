import { EmailInput, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  return (
    <div className={styles.forgot_password}>
      <div className="text text_type_main-large mb-6">Восстановление пароля</div>
      <EmailInput
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Укажите e-mail"
        value={email}
        disabled={false}
      />
      <div className="mt-6">
        <Button
          onClick={function fee() {}}
          size="small"
          type="primary"
          htmlType={'button'}
        >
          Восстановить
        </Button>
      </div>
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

export default ForgotPassword;
