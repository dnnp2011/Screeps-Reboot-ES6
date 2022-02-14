export declare const GC_INTERVAL = 10;
export declare const GARRISON_SIZE = 4;


export declare enum TASK {
    HARVEST = 'harvest',
    BUILD = 'build',
    REPAIR = 'repair',
    UPGRADE = 'upgrade',
    TRANSPORT = 'transport',
    DEFEND = 'defend',
    ATTACK = 'attack',
    SKIRMISH = 'skirmish',
    HEAL = 'heal',
    SCOUT = 'scout',
}


export declare enum ROLE {
    MELEE = 'melee',
    RANGE = 'range',
    SUPPORT = 'support',
    LABOR = 'labor',
    TRANSPORT = 'transport',
}


export const BODY_SUITABILITY_INDEX = {
    [TASK.HARVEST]: {
        [WORK]: 2,
        [MOVE]: 1,
        [CARRY]: 1,
        [ATTACK]: -2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: -2,
    },
    [TASK.BUILD]: {
        [WORK]: 2,
        [MOVE]: 2,
        [CARRY]: 2,
        [ATTACK]: -2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: -2,
    },
    [TASK.REPAIR]: {
        [WORK]: 2,
        [MOVE]: 2,
        [CARRY]: 2,
        [ATTACK]: -2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: -2,
    },
    [TASK.UPGRADE]: {
        [WORK]: 1,
        [MOVE]: 1,
        [CARRY]: 2,
        [ATTACK]: -2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: -2,
    },
    [TASK.TRANSPORT]: {
        [WORK]: -1,
        [MOVE]: 2,
        [CARRY]: 2,
        [ATTACK]: -2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: -2,
    },
    [TASK.DEFEND]: {
        [WORK]: -2,
        [MOVE]: 2,
        [CARRY]: -2,
        [ATTACK]: 2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: 1,
    },
    [TASK.ATTACK]: {
        [WORK]: -2,
        [MOVE]: 1,
        [CARRY]: -2,
        [ATTACK]: 2,
        [RANGED_ATTACK]: -2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: 2,
    },
    [TASK.SKIRMISH]: {
        [WORK]: -2,
        [MOVE]: 2,
        [CARRY]: -2,
        [ATTACK]: -2,
        [RANGED_ATTACK]: 2,
        [HEAL]: -2,
        [CLAIM]: -2,
        [TOUGH]: 1,
    },
    [TASK.HEAL]: {
        [WORK]: -2,
        [MOVE]: 2,
        [CARRY]: -2,
        [ATTACK]: -2,
        [RANGED_ATTACK]: -2,
        [HEAL]: 2,
        [CLAIM]: -2,
        [TOUGH]: 1,
    },
};

export const TASK_BODY_TYPES = {
    [TASK.HARVEST]: [
        ROLE.LABOR,
        ROLE.TRANSPORT,
    ],
    [TASK.BUILD]: [
        ROLE.LABOR,
        ROLE.TRANSPORT,
    ],
    [TASK.REPAIR]: [
        ROLE.LABOR,
        ROLE.TRANSPORT,
    ],
    [TASK.UPGRADE]: [
        ROLE.LABOR,
        ROLE.TRANSPORT,
    ],
    [TASK.TRANSPORT]: [
        ROLE.TRANSPORT,
        ROLE.LABOR,
    ],
    [TASK.DEFEND]: [
        ROLE.MELEE,
        ROLE.RANGE,
    ],
    [TASK.ATTACK]: [
        ROLE.MELEE,
        ROLE.RANGE,
    ],
    [TASK.SKIRMISH]: [
        ROLE.RANGE,
    ],
    [TASK.HEAL]: [
        ROLE.SUPPORT,
    ],
    [TASK.SCOUT]: [
        ROLE.SUPPORT, // TODO: Update this once Scout task is implemented
    ],
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
