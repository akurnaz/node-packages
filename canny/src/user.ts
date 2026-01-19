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
