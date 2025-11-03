export type SortProperty = "newest" | "oldest" | "relevance" | "score" | "statusChanged" | "trending";
export type Response = "success";
export type Status = "open" | "under review" | "planned" | "in progress" | "complete" | "closed";

export type CustomFields = { [key: string]: unknown };

export class CannyError extends Error {
    constructor(message: string) {
        super(`Canny error: ${message}`);
        this.name = "CannyError";
    }
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

export class CannyClient {
    private static readonly BASE_URL = "https://canny.io/api/v1";
    private readonly headers: Headers;
    private readonly apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new CannyError("API key is required for CannyClient");
        }
        this.apiKey = apiKey;
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
    }

    public async createOrUpdateUser(request: CreateOrUpdateUserRequest): Promise<CreateOrUpdateUserResponse> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, ...request }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/users/create_or_update`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body;
    }

    public async listBoards(privateFiltered?: boolean): Promise<Board[]> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/boards/list`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        if (privateFiltered) {
            return body.boards.filter((board: Board) => !board.isPrivate);
        }

        return body.boards;
    }

    public async listPosts(
        boardId: string,
        statuses: Status[],
        limit?: number,
        skip?: number,
        sort?: SortProperty,
    ): Promise<Post[]> {
        const status = statuses.join(",");
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, boardID: boardId, status, limit, skip, sort }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/posts/list`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body.posts;
    }

    public async retrievePost(id: string): Promise<Post> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, id: id }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/posts/retrieve`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body;
    }

    public async createPost(request: CreatePostRequest): Promise<string> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, ...request }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/posts/create`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body.id;
    }

    public async deletePost(id: string): Promise<Response> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, postID: id }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/posts/delete`, requestOptions);

        if (!response.ok) {
            const body = await response.json();
            throw new CannyError(body.error || response.statusText);
        }

        const body = await response.text();

        return body as Response;
    }

    public async listVotes(boardId: string, userId: string, limit?: number, skip?: number): Promise<Vote[]> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, boardID: boardId, userID: userId, limit, skip }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/votes/list`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body.votes;
    }

    public async createVote(postId: string, voterId: string): Promise<Response> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, postID: postId, voterID: voterId }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/votes/create`, requestOptions);

        if (!response.ok) {
            const body = await response.json();
            throw new CannyError(body.error || response.statusText);
        }

        const body = await response.text();

        return body as Response;
    }

    public async deleteVote(postId: string, voterId: string): Promise<Response> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, postID: postId, voterID: voterId }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/votes/delete`, requestOptions);

        if (!response.ok) {
            const body = await response.json();
            throw new CannyError(body.error || response.statusText);
        }

        const body = await response.text();

        return body as Response;
    }
}
