import { Board } from "./board";
import { Post, Status } from "./post";
import { User } from "./user";

export interface Comment {
    /**
     * A unique identifier for the post.
     */
    readonly id: string;

    /**
     * The user who authored the post. If the author's account has been deleted, this field will be null.
     */
    readonly author?: User;

    /**
     * The board this vote is associated with.
     */
    readonly board: Board;

    /**
     * The post this vote is associated with.
     */
    readonly post: Post;

    /**
     * Time at which the comment was first created.
     */
    readonly status?: Status;

    /**
     * Time at which the comment was first created.
     */
    readonly value: string;

    /**
     * Time at which the comment was first created.
     */
    readonly created: Date;
}
