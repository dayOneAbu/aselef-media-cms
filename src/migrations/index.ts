import * as migration_20260213_184423_init from './20260213_184423_init';

export const migrations = [
  {
    up: migration_20260213_184423_init.up,
    down: migration_20260213_184423_init.down,
    name: '20260213_184423_init'
  },
];
