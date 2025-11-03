export enum Direction {
    ASC = "asc",
    DESC = "desc",
}

export class Order {
    readonly property: string;
    readonly direction: Direction;

    private constructor(property: string, direction: Direction) {
        this.property = property;
        this.direction = direction;
    }

    static asc(property: string): Order {
        return new Order(property, Direction.ASC);
    }

    static desc(property: string): Order {
        return new Order(property, Direction.DESC);
    }

    static fromJson(json: any): Order {
        const [property, direction] = json.split(",");

        return new Order(property, direction as Direction);
    }
}

export class Sort {
    readonly orders: Order[];

    constructor(orders: Order[]) {
        this.orders = orders;
    }

    static by(orders: Order[]): Sort {
        return new Sort(orders);
    }

    static fromJson(json: any): Sort {
        return new Sort(json.map(Order.fromJson));
    }
}
