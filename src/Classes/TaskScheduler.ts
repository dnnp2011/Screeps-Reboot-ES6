import TaskQueue from './TaskQueue';


export default class TaskScheduler {
    protected room: Room;

    constructor(room: Room) {
        this.room = room;
    }

    public static init(room: Room): TaskScheduler {
        return new TaskScheduler(room);
    }

    destructor(): void {

    }

    public run(taskQueue: TaskQueue): void {
        // TODO: Implement
    }
}
