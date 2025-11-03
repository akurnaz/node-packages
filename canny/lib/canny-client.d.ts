export type SortProperty = "newest" | "oldest" | "relevance" | "score" | "statusChanged" | "trending";
export type Response = "success";
export type Status = "open" | "under review" | "planned" | "in progress" | "complete" | "closed";
export type CustomFields = {
    [key: string]: unknown;
};
export declare class CannyError extends Error {
    constructor(message: string);
}
export interface CreateOrUpdateUserRequest {
    /**
     * The user's name. Must be between 1 and 50 characters.
     */
    readonly name: string;
    /**
     * The user's unique identifier in Canny. This can be found through the list users endpoint.
     */
    readonly id?: string;
    /**
     * The user's unique identifier in your application.
     */
    readonly userID?: string;
    /**
     * The user's email.
     */
    readonly email?: string;
    /**
     * The user's alias
     */
    readonly alias?: string;
    /**
     * The URL pointing to the user's avatar image.
     */
    readonly avatarURL?: string;
    /**
     * Defines the list of companies the user is associated with.
     * To associate a user with a company, the user must have a UserID.
     * Verify the UserID using the retrieve user endpoint.
     *
     * Omitting a company that the user is currently associated with will not disassociate the user from that company.
     * To disassociate a user from a company, use the remove user from a company endpoint.
     */
    readonly companies?: unknown[];
    /**
     * Any custom fields associated with the user. Each field name (key) must be between 0 and 30 characters long.
     * If field values are strings, they must be less than 200 characters long.
     */
    readonly customFields?: CustomFields;
    /**
     * The date the user was created in your system.
     */
    readonly created?: Date;
}
export interface CreateOrUpdateUserResponse {
    /**
     * The user's unique identifier in Canny.
     */
    readonly id: string;
}
export interface User {
    /**
     * A unique identifier for the user.
     */
    readonly id: string;
    /**
     * The user's unique identifier in your application.
     */
    readonly userID?: string;
    /**
     * The user's name.
     */
    readonly name: string;
    /**
     * Time at which the user was created.
     */
    readonly created: Date;
}
export interface Board {
    /**
     * A unique identifier for the board.
     */
    id: string;
    /**
     * The board's name.
     */
    name: string;
    /**
     * The number of non-deleted posts associated with the board.
     * This number includes posts that are marked as closed or complete.
     */
    postCount: number;
    /**
     * The URL to the board's page.
     */
    url: string;
    /**
     * Whether or not the board is set as private in the administrative settings.
     */
    isPrivate: boolean;
    /**
     * Whether or not comments left on posts can be viewed by other end-users.
     */
    privateComments: boolean;
    /**
     * Time at which the board was created.
     */
    created: Date;
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
     * Any custom fields associated with the post. Each field name (key) must be between 0 and 30 characters long.
     * If field values are strings, they must be less than 200 characters long.
     */
    readonly customFields?: CustomFields;
    /**
     * Time at which the post was created.
     */
    readonly created: Date;
}
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
     * Any custom fields associated with the post. Each field name (key) must be between 0 and 30 characters long.
     * If field values are strings, they must be less than 200 characters long.
     */
    readonly customFields?: CustomFields;
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
export declare class CannyClient {
    private static readonly BASE_URL;
    private readonly headers;
    private readonly apiKey;
    constructor(apiKey: string);
    createOrUpdateUser(request: CreateOrUpdateUserRequest): Promise<CreateOrUpdateUserResponse>;
    listBoards(privateFiltered?: boolean): Promise<Board[]>;
    listPosts(boardId: string, statuses: Status[], limit?: number, skip?: number, sort?: SortProperty): Promise<Post[]>;
    retrievePost(id: string): Promise<Post>;
    createPost(request: CreatePostRequest): Promise<string>;
    deletePost(id: string): Promise<Response>;
    listVotes(boardId: string, userId: string, limit?: number, skip?: number): Promise<Vote[]>;
    createVote(postId: string, voterId: string): Promise<Response>;
    deleteVote(postId: string, voterId: string): Promise<Response>;
}
