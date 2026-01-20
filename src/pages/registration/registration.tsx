import { setUser } from '@/services/user/actions';
import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { EmailInput, Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import type { TRegisterResponse } from '@/services/types';
import type { TLocationState } from '@/utils/types';

import styles from './registration.module.css';

export const Registration = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as TLocationState;
  const from = state?.from?.pathname ?? '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = useCallback(async (): Promise<void> => {
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      return;
    }

    try {
      const response = await fetch(`${serverUrl}auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await checkResponse<TRegisterResponse>(response);

      if (!data.success) {
        throw new Error('Register failed');
      }

      dispatch(setUser(data.user));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      void navigate(from, { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(message);
    }
  }, [name, email, password, navigate]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void register();
      }}
      className={styles.registration}
    >
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
      <Button size="small" type="primary" htmlType={'submit'}>
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
    </form>
  );
};

export default Registration;
