export interface GameStats {
  times: number[];
  avg: number;
  min: number;
  max: number;
  best: number;
}

export interface StatsAdapter {
  saveTime(time: number): Promise<void>;
  getStats(): Promise<GameStats>;
}
