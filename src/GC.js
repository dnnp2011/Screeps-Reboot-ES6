import { GC_INTERVAL } from './constants';


class GarbageCollector {
    runFrequency = GC_INTERVAL;

    static _purgeCreeps() {
        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }
A
run() {
    if (this._shouldRun()) {
        console.log(`GarbageCollector running at ${ Game.time }`);

        GarbageCollector._purgeCreeps();
    }
}

    _shouldRun = () => Game.time % this.runFrequency === 0;
}


export default new GarbageCollector();
