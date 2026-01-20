import { checkResponse } from './checkResponse';
import { serverUrl } from './serverUrl';

import type { TRefreshTokenResponse } from '@/services/types';

export const refreshToken = async (): Promise<TRefreshTokenResponse> => {
  const response = await fetch(`${serverUrl}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });

  const refreshData = await checkResponse<TRefreshTokenResponse>(response);

  if (!refreshData.success) {
    throw new Error('Refresh token failed');
  }

  localStorage.setItem('refreshToken', refreshData.refreshToken);
  localStorage.setItem('accessToken', refreshData.accessToken);

  return refreshData;
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    return await checkResponse<T>(response);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        throw new Error('Refresh token failed');
      }

      const headers = new Headers(options.headers);
      headers.set('authorization', refreshData.accessToken);

      const res = await fetch(url, {
        ...options,
        headers,
      });

      return await checkResponse<T>(res);
    } else {
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  }
};
