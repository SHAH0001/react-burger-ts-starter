import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';
import { EmailInput, Button } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { TResetRequestPasswordResponse } from '@/services/types';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const resetPasswordRequest = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`${serverUrl}password-reset`, {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await checkResponse<TResetRequestPasswordResponse>(response);

      if (!data.success) {
        throw new Error('Request failed');
      }

      localStorage.setItem('resetPassword', 'true');
      void navigate('/reset-password', { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(message);
    }
  }, [email, navigate]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void resetPasswordRequest();
      }}
      className={styles.forgot_password}
    >
      <div className="text text_type_main-large mb-6">Восстановление пароля</div>
      <EmailInput
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Укажите e-mail"
        value={email}
        disabled={false}
      />
      <div className="mt-6">
        <Button size="small" type="primary" htmlType={'submit'}>
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
    </form>
  );
};

export default ForgotPassword;
