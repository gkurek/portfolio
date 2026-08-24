import { localStorageAdapter } from './localStorageAdapter';
import { supabaseAdapter } from './supabaseAdapter';
import type { StatsAdapter } from './types';

export type { GameStats, StatsAdapter } from './types';

export function getStatsAdapter(): StatsAdapter {
  const provider = import.meta.env.PUBLIC_STATS_PROVIDER ?? 'local';

  if (provider === 'supabase') {
    return supabaseAdapter;
  }

  return localStorageAdapter;
}
