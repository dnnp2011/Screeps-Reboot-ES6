import { MAX_CREEPS, ROLE } from './constants';
import { calcBodyCost, Err, report } from './utility';


class Spawner {
    spawn;

    room;

    limits = {
        maxCreeps: MAX_CREEPS,
    };

    constructor(spawn) {
        if (!(spawn instanceof StructureSpawn)) {
            throw new Error('Spawner(): spawn should be an instance of StructureSpawn');
        } else if (!(spawn.room instanceof Room)) {
            throw new Error('Spawner() room should be an instance of Room');
        }

        this.spawn = spawn;
        this.room = spawn.room;
    }

    run() {
        try {
            // TODO: Implement Role assignment logic
            this.spawnCreep(ROLE.WORKER);
        } catch (error) {
            report(`Spawner (${ this.room.name || 'Unknown' }) encountered an error: `, error.message);
        }
    }

    spawnCreep(role = ROLE.WORKER) {
        if (!(this.spawn instanceof StructureSpawn)) {
            throw new Err('Spawner.spawnCreep()', 'this.spawn should be an instance of StructureSpawn');
        }

        let body = this.buildCreepBody(this.room.energyAvailable);

        if (this.canSpawnCreep(body)) {
            // TODO: Update this to use the new spawnCreep method instead

            this.echo('building creep', body);
            this.spawn.createCreep(body, null, { role });
        }
    }

    canSpawnCreep(body) {
        console.log('canSpawn body: ', body);

        const availableEnergy = this.room.energyAvailable;
        const energyCost = calcBodyCost(body);
        const creepCount = this.room.find(FIND_MY_CREEPS).length;

        let canSpawn = true;

        if (this.spawn.spawning) {
            this.echo('is busy spawning...');

            canSpawn = false;
        } else if (availableEnergy < energyCost) {
            this.echo('not enough energy.', { availableEnergy, energyCost });

            canSpawn = false;
        } else if (creepCount >= this.limits.maxCreeps) {
            this.echo('creep limit reached for this room.', { creepCount, maxCreeps: this.limits.maxCreeps });

            canSpawn = false;
        }

        return canSpawn;
    }

    buildCreepBody(availableEnergy, role) {
        let baseBody = [ WORK, MOVE, CARRY ];

        switch (role) {
            case 'harvester':
                baseBody = [ WORK, WORK, MOVE ];
                break;
            default:
                baseBody = [ WORK, MOVE, CARRY ];
                break;
        }

        return this.optimizeParts(availableEnergy, baseBody);
    }

    optimizeParts(availableEnergy, baseBody) {
        // TODO: Needs to have a minimum body of baseBody

        const body = [];

        baseBody.forEach((part) => {
            if (availableEnergy - BODYPART_COST[part] >= 0) {
                body.push(part);

                availableEnergy -= BODYPART_COST[part];
            }
        });

        return body.sort((a, b) => a < b);
    }

    echo(message, data = '') {
        const output = `Spawner (${ this.spawn.name }): ${ message }.`;

        console.log(output, data);
    }
}


export default Spawner;
