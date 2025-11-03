export declare enum Direction {
    ASC = "asc",
    DESC = "desc"
}
export declare class Order {
    readonly property: string;
    readonly direction: Direction;
    private constructor();
    static asc(property: string): Order;
    static desc(property: string): Order;
    static fromJson(json: any): Order;
}
export declare class Sort {
    readonly orders: Order[];
    constructor(orders: Order[]);
    static by(orders: Order[]): Sort;
    static fromJson(json: any): Sort;
}
