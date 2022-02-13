import { ADJACENT, ROLE } from './constants';
import { forEach } from 'lodash';
import Worker from './worker';
import { report } from './utility';
import './interfaces';


// NOTE: Prototype functions must be ES5 format
Room.prototype.creeps = function() {
    return forEach(Game.creeps, (creep => {
        report('Current creep: ', creep);
        if (creep.name === this.name) {
            return creep;
        }

        return null;
    }));
};

Creep.prototype.work = function() {
    const role = this.memory.role;

    switch (role) {
        case ROLE.WORKER:
            (new Worker(this)).run();
            break;
        default:
            report(`Creep (${ this.name }) doesn't have a valid role - `, role);
            break;
    }
};

RoomPosition.prototype.countAdjacentOpenTiles = function() {
    let openTileCount = 8;

    forEach(ADJACENT, (pos => {
        const objects = (new RoomPosition(this.x + pos.x, this.y + pos.y, this.roomName)).look();

        objects.map(object => {
            const type = object.type;

            switch (type) {
                case LOOK_CREEPS:
                    openTileCount--;
                    break;
                case LOOK_TERRAIN:
                    if (object.terrain === 'wall') {
                        openTileCount--;
                    }
                    break;
                case LOOK_STRUCTURES:
                    if (object.structure.structureType === STRUCTURE_WALL) {
                        openTileCount--;
                    }
                    break;
                default:
                    break;
            }
        });
    }));

    return openTileCount;
};
