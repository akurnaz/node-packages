"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannyClient = exports.CannyError = void 0;
class CannyError extends Error {
    constructor(message) {
        super(`Canny error: ${message}`);
        this.name = "CannyError";
    }
}
exports.CannyError = CannyError;
class CannyClient {
    constructor(apiKey) {
        if (!apiKey) {
            throw new CannyError("API key is required for CannyClient");
        }
        this.apiKey = apiKey;
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
    }
    // Users
    createOrUpdateUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(Object.assign({ apiKey: this.apiKey }, request)),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/users/create_or_update`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            return body;
        });
    }
    // Boards
    listBoards(privateFiltered) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/boards/list`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            if (privateFiltered) {
                return body.boards.filter((board) => !board.isPrivate);
            }
            return body.boards;
        });
    }
    // Posts
    listPosts(boardId, statuses, limit, skip, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = statuses.join(",");
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, boardID: boardId, status, limit, skip, sort }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/posts/list`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            return body.posts;
        });
    }
    retrievePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, id: id }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/posts/retrieve`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            return body;
        });
    }
    createPost(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(Object.assign({ apiKey: this.apiKey }, request)),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/posts/create`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            return body.id;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, postID: id }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/posts/delete`, requestOptions);
            if (!response.ok) {
                const body = yield response.json();
                throw new CannyError(body.error || response.statusText);
            }
            const body = yield response.text();
            return body;
        });
    }
    // Comments
    listComments(postId, cursor, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, postID: postId, cursor, limit }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v2/comments/list`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            return body.items;
        });
    }
    // Votes
    listVotes(boardId, userId, limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, boardID: boardId, userID: userId, limit, skip }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/votes/list`, requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                throw new CannyError(body.error || response.statusText);
            }
            return body.votes;
        });
    }
    createVote(postId, voterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, postID: postId, voterID: voterId }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/votes/create`, requestOptions);
            if (!response.ok) {
                const body = yield response.json();
                throw new CannyError(body.error || response.statusText);
            }
            const body = yield response.text();
            return body;
        });
    }
    deleteVote(postId, voterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ apiKey: this.apiKey, postID: postId, voterID: voterId }),
            };
            const response = yield fetch(`${CannyClient.BASE_URL}/v1/votes/delete`, requestOptions);
            if (!response.ok) {
                const body = yield response.json();
                throw new CannyError(body.error || response.statusText);
            }
            const body = yield response.text();
            return body;
        });
    }
}
exports.CannyClient = CannyClient;
CannyClient.BASE_URL = "https://canny.io/api";
