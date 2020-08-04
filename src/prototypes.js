import { map } from 'lodash';


Room.prototype.creeps = () => {
    // return Game.creeps.map(creep => creep.room.name === this.name);
    return map(Game.creeps, creep => creep.room.name === this.name);
};
