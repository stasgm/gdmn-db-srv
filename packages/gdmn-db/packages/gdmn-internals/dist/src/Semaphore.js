"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Semaphore {
    constructor(count = 1) {
        this._queue = [];
        this._permits = count;
    }
    get permits() {
        return this._permits;
    }
    async acquire() {
        if (this._permits > 0) {
            this._permits -= 1;
            return;
        }
        return new Promise((resolve) => this._queue.push(resolve));
    }
    release() {
        this._permits += 1;
        if (this._permits > 1 && this._queue.length > 0) {
            console.warn("Should never be");
        }
        else if (this._permits === 1 && this._queue.length > 0) {
            this._permits -= 1;
            const nextResolve = this._queue.shift();
            if (nextResolve) {
                nextResolve();
            }
        }
    }
}
exports.Semaphore = Semaphore;
//# sourceMappingURL=Semaphore.js.map