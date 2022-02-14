import Task from './Task';
import * as _ from 'lodash';


export default class TaskQueue {
    protected room: Room;
    protected tasks: Task[];
    protected failedTasks: Task[];
    protected cancelledTasks: Task[];
    protected assignedTasks: { [creepId: string]: Task }[];

    constructor(room: Room) {
        this.room = room;
        this.tasks = this.room.memory['taskQueue'] ? JSON.parse(this.room.memory['taskQueue']) : [];
        this.failedTasks = this.room.memory['failedTasks'] ? JSON.parse(this.room.memory['failedTasks']) : [];
        this.cancelledTasks = this.room.memory['cancelledTasks'] ? JSON.parse(this.room.memory['cancelledTasks']) : [];
        this.assignedTasks = this.room.memory['assignedTasks'] ? JSON.parse(this.room.memory['assignedTasks']) : [];
    }

    public static init(room: Room): TaskQueue {
        return new TaskQueue(room);
    }

    destructor(): void {
        this.room.memory['taskQueue'] = JSON.stringify(this.tasks);
        this.room.memory['failedTasks'] = JSON.stringify(this.failedTasks);
        this.room.memory['cancelledTasks'] = JSON.stringify(this.cancelledTasks);
        this.room.memory['assignedTasks'] = JSON.stringify(this.assignedTasks);
    }

    public queue(task: Task): void {
        this.tasks.push(task);
    }

    public dequeue(): Task {
        return this.tasks.shift();
    }

    public cancel(task: Task): void {
        _.remove(this.tasks, (t: Task) => t.id === task.id);

        this.cancelledTasks.push(task);
    }
}
