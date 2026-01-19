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
