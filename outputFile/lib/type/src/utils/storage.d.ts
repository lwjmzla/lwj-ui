declare class Storage {
    private prefixKey;
    constructor(strategy?: string);
    /**
     * @param [string] key
     * @param [any] val
     * @param [number] maxAge 存储时间：s
     */
    set(key: {
        toString: () => string;
    }, val: any, maxAge?: number): void;
    get(key: any): any;
    remove(key: any): void;
}
export declare const local: Storage;
export declare const session: Storage;
export {};
