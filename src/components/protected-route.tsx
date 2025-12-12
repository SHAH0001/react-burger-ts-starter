import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import type { RootState } from '../services/store';
import type { TUser } from '@/utils/user';

type TProps = {
  onlyUnAuth: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({ onlyUnAuth = false, component }: TProps) => {
  const isAuthChecked = useSelector<RootState, boolean>(
    (state): boolean => state.user.isAuthChecked as boolean
  );
  const user = useSelector<RootState, TUser>((state): TUser => state.user.user as TUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};
