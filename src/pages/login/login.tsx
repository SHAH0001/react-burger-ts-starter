import { setUser } from '@/services/user/actions';
import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { EmailInput, Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './login.module.css';

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (): Promise<void> => {
    if (email.length === 0 || password.length === 0) {
      return;
    }

    return fetch(`${serverUrl}auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(checkResponse)
      .then((response) => {
        dispatch(setUser(response.user));
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      });
  };

  return (
    <div className={styles.login}>
      <div className="text text_type_main-large mb-6">Вход</div>
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
      <Button onClick={login} size="small" type="primary" htmlType={'button'}>
        Войти
      </Button>
      <div className={styles.auth_reset}>
        <div className={styles.wrapper}>
          <div className="text text_type_main-default mb-4 mr-1">
            Вы новой пользователь?
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className="text text_type_main-default mr-1">Забыли пароль?</div>
          <div className="text text_type_main-default text_color_inactive">
            <Link to="/forgot-password">Востановить пароль</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
