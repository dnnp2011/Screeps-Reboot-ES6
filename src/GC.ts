import { GC_INTERVAL } from './constants';


class GarbageCollector {
    runFrequency = GC_INTERVAL;

    private static purgeCreeps(): void {
        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }

    public run(): void {
        if (this._shouldRun()) {
            console.log(`GarbageCollector running at ${ Game.time }`);

            GarbageCollector.purgeCreeps();
        }
    }

    private _shouldRun = (): boolean => Game.time % this.runFrequency === 0;
}


export default new GarbageCollector();
