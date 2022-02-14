export default abstract class Role {
    public creep : Creep;

    public room : Room;

    protected memory : CreepMemory;

    protected constructor(creep : Creep) {
        this.creep = creep;
        this.room = creep.room;
        this.memory = creep.memory;
    }

    public run() : void {
        console.log('Override the default run() method');
    }
}
