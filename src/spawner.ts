import { MAX_CREEPS, ROLE } from './constants';
import { calcBodyCost, Err, report } from './utility';
import './prototypes';

export default class Spawner {
    spawn : StructureSpawn;
    room : Room;
    limits = {
        maxCreeps: MAX_CREEPS,
    };

    constructor(spawn : StructureSpawn) {
        this.spawn = spawn;
        this.room = spawn.room;
    }

    public run() : void {
        try {
            // TODO: Implement Role assignment logic
            this.spawnCreep(ROLE.WORKER);
        } catch (error) {
            report(`Spawner (${ this.room.name || 'Unknown' }) encountered an error: `, error.message);
        }
    }

    protected spawnCreep(role = ROLE.WORKER): void {
        const body = this.buildCreepBody(this.room.energyAvailable, role);

        if (this.canSpawnCreep(body)) {
            // TODO: Update this to use the new spawnCreep method instead

            this.echo('building creep', body.toString());
            this.spawn.createCreep(body as BodyPartConstant[], null, { role });
        }
    }

    protected canSpawnCreep(body: string[]): boolean {
        console.log('canSpawn body: ', body.toString());

        const availableEnergy = this.room.energyAvailable;
        const energyCost = calcBodyCost(body);
        const creepCount = this.room.find(FIND_MY_CREEPS).length;

        let canSpawn = true;

        if (this.spawn.spawning) {
            this.echo('is busy spawning...');

            canSpawn = false;
        } else if (availableEnergy < energyCost) {
            this.echo('not enough energy.', ({ availableEnergy, energyCost }).toString());

            canSpawn = false;
        } else if (creepCount >= this.limits.maxCreeps) {
            this.echo('creep limit reached for this room.', { creepCount, maxCreeps: this.limits.maxCreeps });

            canSpawn = false;
        }

        return canSpawn;
    }

    protected buildCreepBody(availableEnergy: number, role: string): string[] {
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

    protected optimizeParts(availableEnergy : number, baseBody : string[]): string[] {
        // TODO: Needs to have a minimum body of baseBody

        const body = [];

        baseBody.forEach((part) => {
            if (availableEnergy - BODYPART_COST[part] >= 0) {
                body.push(part);

                availableEnergy -= BODYPART_COST[part];
            }
        });

        return body.sort();
    }

    private echo(message: string, data: any = null): void {
        const output = `Spawner (${ this.spawn.name }): ${ message }.`;

        console.log(output, data);
    }
}
