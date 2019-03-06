export declare class Semaphore {
    private _permits;
    private _queue;
    constructor(count?: number);
    readonly permits: number;
    acquire(): Promise<void>;
    release(): void;
}
//# sourceMappingURL=Semaphore.d.ts.map