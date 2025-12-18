import type { TErrorResponse } from '@/services/types';

export async function checkResponse<T>(response: Response): Promise<T> {
  try {
    const data = (await response.json()) as T;

    if (!response.ok) {
      throw new Error((data as TErrorResponse).message);
    }

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(message);
  }
}
