import { User } from "./user";

export type Status = "open" | "under review" | "planned" | "in progress" | "complete" | "closed";

export interface CreatePostRequest {
    /**
     * The unique identifier of the post's author.
     */
    readonly authorID: string;

    /**
     * The unique identifier of the post's board.
     */
    readonly boardID: string;

    /**
     * The identifier of the admin who creates the post on behalf of the author. This will be visible in the post.
     */
    readonly byID?: string;

    /**
     * The unique identifier of the post's category or subcategory.
     */
    readonly categoryID?: string;

    /**
     * The post details.
     */
    readonly details: string;

    /**
     * The estimated date of the post's completion.
     */
    readonly eta?: Date;

    /**
     * If the ETA should be made visible to all users.
     */
    readonly etaPublic?: boolean;

    /**
     * The post title.
     */
    readonly title: string;

    /**
     * The ID of the user responsible for the completion of the work described in the post.
     */
    readonly ownerID?: string;

    /**
     * An array of the URLs of post's images.
     */
    readonly imageURLs?: string[];

    /**
     * If the post is being moved from another source, the date this post was originally created.
     */
    readonly createdAt?: Date;
}

export interface Post {
    /**
     * A unique identifier for the post.
     */
    readonly id: string;

    /**
     * The user who authored the post. If the author's account has been deleted, this field will be null.
     */
    readonly author?: User;

    /**
     * A brief title describing the post. This is the shorter text input (where the longer is details).
     */
    readonly title: string;

    /**
     * Any details the user included in the post. This is the longer text field (where the shorter one is "title").
     */
    readonly details: string;

    /**
     * The number of votes that have been cast on this post.
     */
    readonly score: number;

    /**
     * The post's status: "open", "under review", "planned", "in progress", "complete", "closed",
     * or any other status your team has set on the settings page.
     */
    readonly status: Status;

    /**
     * The number of non-deleted comments associated with this post.
     */
    readonly commentCount: number;

    /**
     * Time at which the post was created.
     */
    readonly created: Date;
}
