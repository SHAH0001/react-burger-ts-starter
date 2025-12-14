import { checkResponse } from './checkResponse';
import { serverUrl } from './serverUrl';

export const refreshToken = () => {
  return fetch(`${serverUrl}auth/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(checkResponse)
    .then((refreshData) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!refreshData.success) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(refreshData);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      localStorage.setItem('accessToken', refreshData.accessToken);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return refreshData;
    });
};

export const fetchWithRefresh = async (
  url: string,
  options: {
    method: string;
    headers: {
      authorization: string;
    };
  }
) => {
  try {
    const res = await fetch(url, options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await checkResponse(res);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'jwt expired') {
        console.log('Error: ', err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const refreshData = await refreshToken();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  }
};
