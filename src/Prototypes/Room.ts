import './interfaces';
import * as _ from 'lodash';


// NOTE: Prototype functions must be ES5 format
Room.prototype.creeps = function() {
    return _.filter(Game.creeps, (creep => creep.room.name === this.name && creep.my));
};

Room.prototype.flags = function() {
    return _.filter(Game.flags, (flag => flag.room.name === this.name));
};
