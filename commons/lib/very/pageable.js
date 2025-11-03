"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRequest = void 0;
const order_1 = require("./order");
class PageRequest {
    constructor(params) {
        const { page, size, sort } = params;
        if (page < 0)
            throw new Error("Page index must not be less than zero!");
        if (size < 1)
            throw new Error("Page size must not be less than one!");
        this.page = page;
        this.size = size;
        this.sort = sort;
    }
    get offset() {
        return this.page * this.size;
    }
    next() {
        return new PageRequest({ page: this.page + 1, size: this.size, sort: this.sort });
    }
    previous() {
        return this.page === 0 ? this : new PageRequest({ page: this.page - 1, size: this.size, sort: this.sort });
    }
    first() {
        return new PageRequest({ page: 0, size: this.size, sort: this.sort });
    }
    withPage(page) {
        return new PageRequest({ page, size: this.size, sort: this.sort });
    }
    hasPrevious() {
        return this.page > 0;
    }
    static fromJson(json) {
        return new PageRequest({
            page: json.page,
            size: json.size,
            sort: order_1.Sort.fromJson(json.sort),
        });
    }
}
exports.PageRequest = PageRequest;
