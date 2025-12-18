import type { TIngredient } from '@/utils/types';
import type { TUser } from '@/utils/user';

export type TErrorResponse = {
  success: false;
  message: string;
};

type TUserOkResponse = {
  success: true;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = TUserOkResponse | TErrorResponse;

type TOrderOkResponse = {
  success: true;
  name: string;
  order: {
    number: number;
  };
};

export type TOrderResponse = TOrderOkResponse | TErrorResponse;

type TLoadingIngredientsOkResponse = {
  success: true;
  data: TIngredient[];
};

export type TLoadingIngredientsResponse = TLoadingIngredientsOkResponse | TErrorResponse;

type TLoginOkResponse = {
  success: true;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TLoginResponse = TLoginOkResponse | TErrorResponse;

type TRegisterOkResponse = {
  success: true;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TRegisterResponse = TRegisterOkResponse | TErrorResponse;

type TResetPasswordOkResponse = {
  success: true;
};

export type TResetPasswordResponse = TResetPasswordOkResponse | TErrorResponse;

type TResetPasswordRequestOkResponse = {
  success: true;
};

export type TResetRequestPasswordResponse =
  | TResetPasswordRequestOkResponse
  | TErrorResponse;

type TLogoutOkResponse = {
  success: true;
};

export type TLogoutResponse = TLogoutOkResponse | TErrorResponse;

type TUpdateUserOkResponse = {
  success: true;
  user: TUser;
};

export type TUpdateUserResponse = TUpdateUserOkResponse | TErrorResponse;

type TRefreshTokenOkResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TRefreshTokenResponse = TRefreshTokenOkResponse | TErrorResponse;
