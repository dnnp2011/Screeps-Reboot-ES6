import { Err } from 'src/utility';
import GC from './GC';
import './prototypes';
import Spawner from './spawner';


const app = {
    spawners: {},
};

export const loop = () => {
    GC.run();

    roomLoop();
};

const creepLoop = (room) => {
    if (!(room instanceof Room)) {
        throw new Error('creepLoop(): room should be an instance of Room');
    }

    const creepsInRoom = room.creeps();
    console.log('Creeps in room:', creepsInRoom);
};

const roomLoop = () => {
    for (const room in Game.rooms) {
        spawnLoop(room);
        creepLoop(room);
    }
};

const spawnLoop = (room) => {
    // figure out what this room needs
    const spawns = room.find(FIND_MY_SPAWNS);

    for (const spawn in spawns) {
        if (!(spawn instanceof StructureSpawn)) {
            throw new Error('spawnLoop(): spawn must be an instance of StructureSpawn');
        }

        if (!app.spawners[spawn.name]) {
            app.spawners[spawn.name] = new Spawner(spawn);
        }
    }

    for (const spawner in app.spawners) {
        if (!(spawner instanceof Spawner)) {
            throw new Err('spawnLoop()', 'spawner must be instance of Spawner');
        }

        spawner.run();
    }

    // see if i have enough energy
    // spawn the creep
};

