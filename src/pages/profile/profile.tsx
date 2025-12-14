import { ProfileNav } from '@/components/profile-nav/profile-nav';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.profile}>
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
            <Button htmlType="button" size="medium" type="secondary">
              Отмена
            </Button>
            <Button htmlType="submit">Сохранить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
