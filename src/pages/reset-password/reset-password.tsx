import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { TResetPasswordResponse } from '@/services/types';

import styles from './reset-password.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [codeFromLetter, setCodeFromLetter] = useState('');
  const navigate = useNavigate();

  const resetPassword = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`${serverUrl}password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify({
          password,
          token: codeFromLetter,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await checkResponse<TResetPasswordResponse>(response);

      if (!data.success) {
        throw new Error(data.message);
      }

      localStorage.removeItem('resetPassword');
      void navigate('/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown message';
      console.error(message);
    }
  }, [password, codeFromLetter, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      void navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void resetPassword();
      }}
      className={styles.reset_password}
    >
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
      <Button size="small" type="primary" htmlType={'submit'}>
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
    </form>
  );
};

export default ResetPassword;
