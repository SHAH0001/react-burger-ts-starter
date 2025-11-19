import type { TIngredient } from '@/utils/types';

export const ATTACH_BUN = 'ATTACH_BUN';

export const setBun = (bun: TIngredient) => ({
  type: ATTACH_BUN,
  payload: bun,
});
