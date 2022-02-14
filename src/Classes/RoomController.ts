import { SpawnController, TaskController, TaskQueue, TaskScheduler } from './index';
import '../Prototypes';
import CreepPool from './CreepPool';


export default class RoomController {
    protected room: Room;
    protected spawnController: SpawnController;
    protected taskController: TaskController;
    protected taskQueue: TaskQueue;
    protected taskScheduler: TaskScheduler;
    protected creepPool: CreepPool;

    constructor(room: Room, unitRequests: [] = null, resourceRequests: [] = null) {
        this.room = room;
        this.spawnController = SpawnController.init(this.room);
        this.taskController = TaskController.init(this.room);
        this.taskQueue = TaskQueue.init(this.room);
        this.taskScheduler = TaskScheduler.init(this.room);
    }

    destructor(): void {
        this.spawnController.destructor();
        this.taskController.destructor();
        this.taskQueue.destructor();
        this.taskScheduler.destructor();
    }

    public static init(room: Room, unitRequests?: [], resourceRequests?: []): RoomController {
        return new RoomController(room, unitRequests, resourceRequests);
    }

    public run(): void {
        this.spawnController.run(this.getRoleCall(), this.getEmergencyFactors());
        this.taskController.run(this.taskQueue);
        this.taskScheduler.run(this.taskQueue);

        this.destructor();
    }

    protected getRoleCall(): { [role: string]: number } {
        return this.creepPool.roleCall();
    }

    protected getEmergencyFactors(): [] {
        // TODO: Implement this method
        // TODO: Figure out the best way to represent these emergency factors so they can modify the priority of generated tasks
        //  and creep spawning

        return [];
    }
}
