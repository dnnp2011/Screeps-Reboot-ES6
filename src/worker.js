import Role from './role';

class Worker extends Role {
    worker;

    room;

    constructor(worker) {
        super();

        if (!(worker instanceof Creep)) {
            throw new Error('Worker(): worker must be an instance of Creep');
        }

        this.worker = worker;
        this.room = worker.room;

        this.worker.memory.target = null;
        this.worker.memory.action = null;
    }

    run() {
        // Option 0: Continue any current work
        const memory = this.worker.memory;
        if (memory.target && memory.action) {
            const targetPos = new RoomPosition(memory.target.x, memory.target.y, this.room);

            if (memory.action === 'move' || !targetPos.isNearTo(this.worker.pos.x, this.worker.pos.y)) {
                memory.action = 'move';

                return this.worker.moveTo(targetPos);
            } else if (memory.action === 'harvest' || targetPos.isNearTo(this.worker.pos.x, this.worker.pos.y)) {
                memory.action = 'harvest';

                return this.worker.harvest(targetPos.lookFor(LOOK_SOURCES)[0]);
            }
        }

        // Option 1: Find an open energy source and go harvest energy
        let harvestTarget = this.findHarvestTarget();

        if (this.findHarvestTarget()) {
            return this.worker.moveTo(harvestTarget);
        }

        // Option 2: Find dropped energy, go pick it up and transport it to the spawn

        // Option 3: Find construction sites and go build them

        // Option 4: Find a structure below 50% health and go repair it

        // Option 5: Find a creep which need to be renewed and renew them
    }

    findHarvestTarget() {
        let sources = this.room.find(FIND_SOURCES_ACTIVE);
        let target = null;

        while (sources.length > 0) {
            let source = this.worker.pos.findClosestByPath(sources);

            if (source.pos.countAdjacentOpenTiles()) {
                target = source;
            }

            sources = sources.filter(src => src !== source);
        }

        return target;
    }
}


export default Worker;
