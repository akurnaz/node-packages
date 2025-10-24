import { AuthData } from "firebase-functions/tasks";
export declare class UnauthenticatedHttpsError extends Error {
}
export declare class EmailNotVerifiedError extends Error {
}
export declare class InvalidSignInProviderError extends Error {
}
export declare enum SignInProvider {
    ANONYMOUS = "anonymous",
    APPLE = "apple.com",
    GOOGLE = "google.com"
}
export interface AuthValidationConfig {
    allowNotVerifiedEmail: boolean;
    allowedProviders: SignInProvider[];
}
export declare function getAuthValidationConfig(): AuthValidationConfig;
export declare function setAuthValidationConfig(config: AuthValidationConfig): void;
export declare function validateAuth(auth?: AuthData, config?: {
    allowNotVerifiedEmail?: boolean;
    signInProviders?: SignInProvider[];
}): AuthData;
