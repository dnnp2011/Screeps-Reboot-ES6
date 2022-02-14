export default class Task {
    protected _targetId: string;
    public id: string;


    constructor(targetId: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this._targetId = targetId;
    }
}
