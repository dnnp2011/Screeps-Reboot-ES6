import TaskQueue from './TaskQueue';


export default class TaskController {
    protected room: Room;

    constructor(room: Room) {
        this.room = room;
    }

    public static init(room: Room): TaskController {
        return new TaskController(room);
    }

    destructor(): void {

    }

    public run(taskQueue: TaskQueue): void {
        // TODO: Implement
    }
}
