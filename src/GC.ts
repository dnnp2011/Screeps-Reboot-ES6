import { GC_INTERVAL } from './constants';
import { Logger } from './Classes';


class GarbageCollector {
    runFrequency = GC_INTERVAL;

    private static purgeCreeps(): number {
        let purgeCount = 0;

        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
                purgeCount++;
            }
        }

        return purgeCount;
    }

    public run(): void {
        if (this._shouldRun()) {
            const purgeCount = GarbageCollector.purgeCreeps();

            Logger.log(`GC: Purged ${ purgeCount } entries at ${ Game.time }`);
        }
    }

    private _shouldRun = (): boolean => Game.time % this.runFrequency === 0;
}


export default new GarbageCollector();
