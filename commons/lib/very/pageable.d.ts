import { Sort } from "./order";
export interface Pageable {
    readonly page: number;
    readonly size: number;
    readonly offset: number;
    readonly sort: Sort;
    next(): Pageable;
    previous(): Pageable;
    first(): Pageable;
    withPage(pageNumber: number): Pageable;
    hasPrevious(): boolean;
}
export declare class PageRequest implements Pageable {
    readonly page: number;
    readonly size: number;
    readonly sort: Sort;
    constructor(params: {
        page: number;
        size: number;
        sort: Sort;
    });
    get offset(): number;
    next(): PageRequest;
    previous(): PageRequest;
    first(): PageRequest;
    withPage(page: number): PageRequest;
    hasPrevious(): boolean;
    static fromJson(json: any): Pageable;
}
