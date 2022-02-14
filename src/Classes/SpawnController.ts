export default class SpawnController {
    protected room: Room;

    constructor(room: Room) {
        this.room = room;
    }

    public static init(room: Room): SpawnController {
        return new SpawnController(room);
    }

    destructor(): void {

    }

    public run(roleCall: { [role: string]: number }, emergencyFactors): void {
        // TODO: Implement
    }

    protected energyAvailable(): number {
        return this.room.energyAvailable;
    }

    protected energyCapacityAvailable(): number {
        return this.room.energyCapacityAvailable;
    }
}
