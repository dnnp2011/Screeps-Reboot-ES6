import Role from './role';


export default class Worker extends Role {
    constructor(creep: Creep) {
        super(creep);
    }

    public run(): void {
        // Check if my energy is full

        // If so, drop off my energy at spawns

        // If not, figure out the next job to do



        // Option 0: Continue any current work
        // Option 1: Find an open energy source and go harvest energy
        // Option 2: Find dropped energy, go pick it up and transport it to the spawn
        // Option 3: Find construction sites and go build them
        // Option 4: Find a structure below 50% health and go repair it
        // Option 5: Find a creep which need to be renewed and renew them
    }

    private findHarvestTarget(): void {
        let sources = this.room.find(FIND_SOURCES_ACTIVE);
        let target = null;

        while (sources.length > 0) {
            const source = this.creep.pos.findClosestByPath(sources);

            if (source.pos.countAdjacentOpenTiles()) {
                target = source;
            }

            sources = sources.filter(src => src !== source);
        }

        return target;
    }
}
