import { Board } from "./board";
import { CreatePostRequest, Post, Status } from "./post";
import { CreateOrUpdateUserRequest, CreateOrUpdateUserResponse } from "./user";
import { Vote } from "./vote";
export type SortProperty = "newest" | "oldest" | "relevance" | "score" | "statusChanged" | "trending";
export type Response = "success";
export declare class CannyError extends Error {
    constructor(message: string);
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
    listComments(postId: string, cursor?: string, limit?: number): Promise<Comment[]>;
    listVotes(boardId: string, userId: string, limit?: number, skip?: number): Promise<Vote[]>;
    createVote(postId: string, voterId: string): Promise<Response>;
    deleteVote(postId: string, voterId: string): Promise<Response>;
}
