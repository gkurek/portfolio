import type { StatsAdapter } from './types';

/**
 * Placeholder for a future Supabase-backed stats adapter.
 * Set PUBLIC_STATS_PROVIDER=supabase and configure env vars to enable.
 */
export const supabaseAdapter: StatsAdapter = {
  async saveTime(_time: number) {
    throw new Error('Supabase adapter is not implemented yet.');
  },

  async getStats() {
    throw new Error('Supabase adapter is not implemented yet.');
  },
};
