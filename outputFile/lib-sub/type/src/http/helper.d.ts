/**
 * 显示 loading 层
 * @export
 * @param {string} [message='']
 */
export declare function showFullScreenLoading(message?: string): void;
/**
 * 延迟 loading 层
 * @export
 * @returns
 */
export declare function hideFullScreenLoading(): void;
/**
 * 解析blob文件
 * @export
 * @returns
 */
export declare function parsingBlob(data: any): Promise<unknown>;
