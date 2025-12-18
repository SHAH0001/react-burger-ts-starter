import { setUser } from '@/services/user/actions';
import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { EmailInput, Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import type { TLoginResponse } from '@/services/types';
import type { TLocationState } from '@/utils/types';

import styles from './login.module.css';

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as TLocationState;
  const from = state?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useCallback(async (): Promise<void> => {
    if (!email || !password) {
      return;
    }

    try {
      const response = await fetch(`${serverUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await checkResponse<TLoginResponse>(response);

      if (!data.success) {
        throw new Error('Login failed');
      }

      dispatch(setUser(data.user));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      void navigate(from, { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(message);
    }
  }, [email, password, navigate]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void login();
      }}
      className={styles.login}
    >
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
      <Button size="small" type="primary" htmlType={'submit'}>
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
    </form>
  );
};

export default Login;
