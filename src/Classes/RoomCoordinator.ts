import _ = require('lodash');
import '../Prototypes';
import { RoomController } from './index';
import Logger from './Logger';


export default class RoomCoordinator {
    protected uncontrolledRooms: Room[];
    protected controlledRooms: Room[];

    constructor() {
        this.uncontrolledRooms = _.filter(Game.rooms, (room: Room) => {
            // NOTE: Only flagged rooms will be managed by the RoomCoordinator
            return (!room.controller || !room.controller.my) && room.flags.length;
        });

        this.controlledRooms = _.filter(Game.rooms, (room: Room) => {
            return room.controller && room.controller.my;
        });
    }

    public static init(): RoomCoordinator {
        return new RoomCoordinator();
    }

    public manageUncontrolledRooms(): void {
        _.forEach(this.uncontrolledRooms, (room: Room) => {
            // TODO: Implement uncontrolled room management
            Logger.log("Can't manage uncontrolled room %s because feature not implemented", room.name);
        });
    }

    public manageControlledRooms(): void {
        _.forEach(this.controlledRooms, (room: Room) => {
            RoomController.init(room).run();
        });
    }
}
