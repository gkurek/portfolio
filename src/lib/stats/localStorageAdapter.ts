import type { GameStats, StatsAdapter } from './types';

const STORAGE_KEY = 'patience-game-stats';

interface StoredData {
  times: number[];
}

function load(): StoredData {
  if (typeof localStorage === 'undefined') {
    return { times: [] };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { times: [] };
    }

    const parsed = JSON.parse(raw) as StoredData;
    return { times: Array.isArray(parsed.times) ? parsed.times : [] };
  } catch {
    return { times: [] };
  }
}

function persist(data: StoredData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toGameStats(times: number[]): GameStats {
  if (times.length === 0) {
    return { times: [], avg: 0, min: 0, max: 0, best: 0 };
  }

  const min = Math.min(...times);
  const max = Math.max(...times);
  const avg = parseFloat(
    (times.reduce((sum, value) => sum + value, 0) / times.length).toFixed(3),
  );

  return { times, avg, min, max, best: max };
}

export const localStorageAdapter: StatsAdapter = {
  async saveTime(time: number) {
    const data = load();
    data.times.push(time);
    persist(data);
  },

  async getStats() {
    return toGameStats(load().times);
  },
};
