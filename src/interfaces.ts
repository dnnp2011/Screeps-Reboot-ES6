interface Room {
    creeps() : [ Creep ];
}

interface Creep {
    work(): void;
}

interface RoomPosition {
    countAdjacentOpenTiles(): number;
}
