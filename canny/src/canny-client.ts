import { Board } from "./board";
import { Comment } from "./comment";
import { CreatePostRequest, Post, Status } from "./post";
import { CreateOrUpdateUserRequest, CreateOrUpdateUserResponse } from "./user";
import { Vote } from "./vote";

export type SortProperty = "newest" | "oldest" | "relevance" | "score" | "statusChanged" | "trending";
export type Response = "success";

export class CannyError extends Error {
    constructor(message: string) {
        super(`Canny error: ${message}`);
        this.name = "CannyError";
    }
}

export class CannyClient {
    private static readonly BASE_URL = "https://canny.io/api";
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

    // Users

    public async createOrUpdateUser(request: CreateOrUpdateUserRequest): Promise<CreateOrUpdateUserResponse> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, ...request }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/v1/users/create_or_update`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body;
    }

    // Boards

    public async listBoards(privateFiltered?: boolean): Promise<Board[]> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/v1/boards/list`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        if (privateFiltered) {
            return body.boards.filter((board: Board) => !board.isPrivate);
        }

        return body.boards;
    }

    // Posts

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

        const response = await fetch(`${CannyClient.BASE_URL}/v1/posts/list`, requestOptions);

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

        const response = await fetch(`${CannyClient.BASE_URL}/v1/posts/retrieve`, requestOptions);

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

        const response = await fetch(`${CannyClient.BASE_URL}/v1/posts/create`, requestOptions);

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

        const response = await fetch(`${CannyClient.BASE_URL}/v1/posts/delete`, requestOptions);

        if (!response.ok) {
            const body = await response.json();
            throw new CannyError(body.error || response.statusText);
        }

        const body = await response.text();

        return body as Response;
    }

    // Comments

    public async listComments(postId: string, cursor?: string, limit?: number): Promise<Comment[]> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, postID: postId, cursor, limit }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/v2/comments/list`, requestOptions);

        const body = await response.json();

        if (!response.ok) {
            throw new CannyError(body.error || response.statusText);
        }

        return body.items;
    }

    // Votes

    public async listVotes(boardId: string, userId: string, limit?: number, skip?: number): Promise<Vote[]> {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ apiKey: this.apiKey, boardID: boardId, userID: userId, limit, skip }),
        };

        const response = await fetch(`${CannyClient.BASE_URL}/v1/votes/list`, requestOptions);

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

        const response = await fetch(`${CannyClient.BASE_URL}/v1/votes/create`, requestOptions);

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

        const response = await fetch(`${CannyClient.BASE_URL}/v1/votes/delete`, requestOptions);

        if (!response.ok) {
            const body = await response.json();
            throw new CannyError(body.error || response.statusText);
        }

        const body = await response.text();

        return body as Response;
    }
}
