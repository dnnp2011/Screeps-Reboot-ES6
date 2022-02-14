import './interfaces';
import { ADJACENT } from '../constants';
import * as _ from 'lodash';


// NOTE: Prototype functions must be ES5 format
RoomPosition.prototype.countAdjacentOpenTiles = function() {
    let openTileCount = 8;

    _.forEach(ADJACENT, (pos => {
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
