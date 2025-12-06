import { EmailInput, Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './registration.module.css';

export const Registration = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.registration}>
      <div className="text text_type_main-large mb-6">Регистрация</div>
      <div className="mb-6">
        <Input
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Имя"
          value={name}
        />
      </div>
      <EmailInput
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="E-mail"
        value={email}
        disabled={false}
      />
      <div className="mt-6 mb-6">
        <Input
          icon="ShowIcon"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Пароль"
          type="password"
          value={password}
        />
      </div>
      <Button
        onClick={function fee() {}}
        size="small"
        type="primary"
        htmlType={'button'}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.auth_reset}>
        <div className={styles.wrapper}>
          <div className="text text_type_main-default mb-4 mr-1">
            Уже зарегистрированы?
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
