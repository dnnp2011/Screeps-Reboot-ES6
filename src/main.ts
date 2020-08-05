import { forEach } from 'lodash';
import { Err, report } from './utility';
import GC from './GC';
import Spawner from './spawner';
import Worker from './worker';
import './prototypes';


const app = {
    spawners: {},
};

export function loop(): void {
    GC.run();

    roomLoop();
}


function creepLoop(room): void {
    if (!(room instanceof Room)) {
        throw new Error('creepLoop(): room should be an instance of Room');
    }

    const creepsInRoom = room.creeps();

    forEach(creepsInRoom, (creep => {
        const role = creep.memory.role;

        switch (role) {
            default:
                (new Worker(creep)).run();
                break;
        }
    }));
}

function roomLoop(): void {
    for (const room in Game.rooms) {
        spawnLoop(Game.rooms[room]);
        creepLoop(Game.rooms[room]);
    }
}

function spawnLoop(room): void {
    // figure out what this room needs
    const spawns = room.find(FIND_MY_SPAWNS);

    for (const spawn in spawns) {
        if (!(spawns[spawn] instanceof StructureSpawn)) {
            throw new Error('spawnLoop(): spawn must be an instance of StructureSpawn');
        }

        if (!app.spawners[spawn]) {
            app.spawners[spawn] = new Spawner(spawns[spawn]);
        }
    }

    for (const spawner in app.spawners) {
        if (!(app.spawners[spawner] instanceof Spawner)) {
            throw new Err('spawnLoop()', 'spawner must be instance of Spawner');
        }

        app.spawners[spawner].run();
    }
}
