import { Board } from "./board";
import { Post } from "./post";
import { User } from "./user";
export interface Vote {
    /**
     * A unique identifier for the vote.
     */
    readonly id: string;
    /**
     * The board this vote is associated with.
     */
    readonly board: Board;
    /**
     * The post this vote is associated with.
     */
    readonly post: Post;
    /**
     * The user this post is associated with.
     */
    readonly voter: User;
    /**
     * Time at which the vote was first cast.
     */
    readonly created: Date;
}
