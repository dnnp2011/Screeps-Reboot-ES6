declare interface Room {
    creeps() : [ Creep ];
    flags() : [ Flag ];
}

interface Creep {
    work(): void;
}

interface RoomPosition {
    countAdjacentOpenTiles(): number;
}
