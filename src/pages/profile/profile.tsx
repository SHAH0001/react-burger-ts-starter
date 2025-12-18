import { ProfileNav } from '@/components/profile-nav/profile-nav';
import { fetchWithRefresh } from '@/utils/api';
import { serverUrl } from '@/utils/serverUrl';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/services/store';
import type { TUpdateUserResponse } from '@/services/types';
import type { TUser } from '@/utils/user';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector<RootState, TUser>((state): TUser => state.user.user as TUser);

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setEmail(user.email);
  }, []);

  const isTouch = user.name !== name || user.email !== email || password.length > 0;

  const cancel = (): void => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  };

  const editUser = useCallback(async (): Promise<void> => {
    try {
      const data = await fetchWithRefresh<TUpdateUserResponse>(`${serverUrl}auth/user`, {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('accessToken') ?? '',
        },
      });

      if (!data.success) {
        throw new Error('Update failed');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(message);
    }
  }, [email, password, name]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void editUser();
      }}
      className={styles.profile}
    >
      <div className={styles.profile_wrapper}>
        <ProfileNav />
        <div className="ml-10">
          <Input
            icon="ShowIcon"
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Имя"
            value={name}
          />
          <div className="mt-6 mb-6">
            <Input
              icon="ShowIcon"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              value={email}
            />
          </div>
          <Input
            icon="ShowIcon"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Пароль"
            type="password"
            value={password}
          />
          <div className={`${styles.controls} mt-6`}>
            {isTouch && (
              <>
                <Button
                  onClick={cancel}
                  htmlType="button"
                  size="medium"
                  type="secondary"
                >
                  Отмена
                </Button>
                <Button htmlType="submit">Сохранить</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
