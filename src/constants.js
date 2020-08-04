/* eslint-disable no-unused-vars */

export const GC_INTERVAL = 10;
export const MAX_CREEPS = 4;
export const ROLE = {
    HARVESTER: 'harvester',
    WORKER: 'worker',
    BUILDER: 'builder',
    HANDYMAN: 'handyman',
    REPAIRMAN: 'repairman',
    SOLDIER: 'solider',
    MEDIC: 'medic',
    SCOUT: 'scout',
    CARRIER: 'carrier',
};
export const ADJACENT = {
    0: { x: -1, y: 1 },
    1: { x: 0, y: 1 },
    2: { x: 1, y: 1 },
    3: { x: 1, y: 0 },
    4: { x: 1, y: -1 },
    5: { x: 0, y: -1 },
    6: { x: -1, y: -1 },
    7: { x: -1, y: 0 },
};
