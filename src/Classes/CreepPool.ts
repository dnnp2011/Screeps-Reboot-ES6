import * as _ from 'lodash';
import '../Prototypes';
import Logger from './Logger';


export default class CreepPool {
    protected availableCreeps: Creep[];
    protected occupiedCreeps: Creep[];

    constructor(room: Room) {
        _.forEach(room.creeps, (creep: Creep) => {
            if (!creep.memory['assigned']) {
                this.availableCreeps.push(creep);
            } else {
                this.occupiedCreeps.push(creep);
            }
        });
    }

    public static init(room: Room): CreepPool {
        return new CreepPool(room);
    }

    // TODO: Could also pass a specific Task type and return the first creep suitable for that task
    public pop(bodyType: string): Creep | null {
        if (this.availableCreeps.length) {
            const suitableCreep = this.availableCreeps.find((creep: Creep) => creep.memory['bodyType'] === bodyType);

            if (suitableCreep) {
                this.availableCreeps = _.without(this.availableCreeps, suitableCreep);
                this.occupiedCreeps.push(suitableCreep);
                suitableCreep.memory['assigned'] = true;

                return suitableCreep;
            }

            Logger.error(`CreepPool.pop: No suitable creep found for body type ${ bodyType }`);
        }

        return null;
    }

    public roleCall(): { [role: string]: number } {
        const roleCall = {};

        _.forEach(this.occupiedCreeps, (creep: Creep) => {
            if (!roleCall[creep.memory['role']]) {
                roleCall[creep.memory['role']] = 0;
            }

            roleCall[creep.memory['role']]++;
        });

        return roleCall;
    }
}
