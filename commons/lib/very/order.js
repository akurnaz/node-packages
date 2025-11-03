"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = exports.Order = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction["ASC"] = "asc";
    Direction["DESC"] = "desc";
})(Direction || (exports.Direction = Direction = {}));
class Order {
    constructor(property, direction) {
        this.property = property;
        this.direction = direction;
    }
    static asc(property) {
        return new Order(property, Direction.ASC);
    }
    static desc(property) {
        return new Order(property, Direction.DESC);
    }
    static fromJson(json) {
        const [property, direction] = json.split(",");
        return new Order(property, direction);
    }
}
exports.Order = Order;
class Sort {
    constructor(orders) {
        this.orders = orders;
    }
    static by(orders) {
        return new Sort(orders);
    }
    static fromJson(json) {
        return new Sort(json.map(Order.fromJson));
    }
}
exports.Sort = Sort;
