import { calcBodyCost, Err } from 'src/utility';


class Spawner {
    spawn;

    room;

    limits = {
        maxCreeps: 10,
    };

    constructor(spawn) {
        if (!(spawn instanceof StructureSpawn)) {
            throw new Error('Spawner(): spawn should be an instance of StructureSpawn');
        }

        this.spawn = spawn;
        this.room = spawn.room.name;
    }

    run() {
        this.spawnCreep();
    }

    spawnCreep() {
        if (!(this.spawn instanceof StructureSpawn)) {
            throw new Err('Spawner.spawnCreep()', 'this.spawn should be an instance of StructureSpawn');
        }

        if (this.canSpawnCreep([ WORK, CARRY, MOVE ])) {
            // TODO: Update this to use the new spawnCreep method instead
            let body = this.buildCreepBody(this.room.energyAvailable);

            this.echo('building creep', body);
            this.spawn.createCreep(body);
        }
    }

    canSpawnCreep(body) {
        const availableEnergy = Game.rooms[this.room].energyAvailable;
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

    buildCreepBody(availableEnergy, role = 'worker') {
        let baseBody = [ WORK, MOVE, CARRY ];

        switch (role) {
            case 'harvester':
                baseBody = [ WORK, WORK, MOVE ];
            default:
                baseBody = [ WORK, MOVE, CARRY ];
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

    echo(message, data = null) {
        const output = `Spawner (${ this.spawn.name }): ${ message }.`;

        console.log(output, data);
    }
}


export default Spawner;
