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

export class PageRequest implements Pageable {
    readonly page: number;
    readonly size: number;
    readonly sort: Sort;

    constructor(params: { page: number; size: number; sort: Sort }) {
        const { page, size, sort } = params;
        if (page < 0) throw new Error("Page index must not be less than zero!");
        if (size < 1) throw new Error("Page size must not be less than one!");
        this.page = page;
        this.size = size;
        this.sort = sort;
    }

    get offset(): number {
        return this.page * this.size;
    }

    next(): PageRequest {
        return new PageRequest({ page: this.page + 1, size: this.size, sort: this.sort });
    }

    previous(): PageRequest {
        return this.page === 0 ? this : new PageRequest({ page: this.page - 1, size: this.size, sort: this.sort });
    }

    first(): PageRequest {
        return new PageRequest({ page: 0, size: this.size, sort: this.sort });
    }

    withPage(page: number): PageRequest {
        return new PageRequest({ page, size: this.size, sort: this.sort });
    }

    hasPrevious(): boolean {
        return this.page > 0;
    }

    public static fromJson(json: any): Pageable {
        return new PageRequest({
            page: json.page,
            size: json.size,
            sort: Sort.fromJson(json.sort),
        });
    }
}
