import { AuthData } from "firebase-functions/tasks";

export class UnauthenticatedHttpsError extends Error {
}

export class EmailNotVerifiedError extends Error {
}

export class InvalidSignInProviderError extends Error {
}

export enum SignInProvider {
    ANONYMOUS = "anonymous",
    APPLE = "apple.com",
    GOOGLE = "google.com",
}

export interface AuthValidationConfig {
    allowNotVerifiedEmail: boolean;
    allowedProviders: SignInProvider[];
}

let authValidationConfig: AuthValidationConfig;

export function getAuthValidationConfig(): AuthValidationConfig {
    return authValidationConfig;
}

export function setAuthValidationConfig(config: AuthValidationConfig) {
    authValidationConfig = config;
}

export function validateAuth(
    auth?: AuthData,
    config?: {
        allowNotVerifiedEmail?: boolean;
        signInProviders?: SignInProvider[];
    }
): AuthData {
    if (authValidationConfig == null) {
        throw new Error("Auth validation config is not set");
    }

    if (auth == null) {
        throw new UnauthenticatedHttpsError();
    }

    const token = auth.token;

    const allowNotVerifiedEmail = config?.allowNotVerifiedEmail ?? authValidationConfig.allowNotVerifiedEmail;
    if (!allowNotVerifiedEmail) {
        const emailVerified = token.email_verified ?? false;
        if (!emailVerified) {
            throw new EmailNotVerifiedError();
        }
    }

    const allowedProviders = config?.signInProviders ?? authValidationConfig.allowedProviders;
    const signInProvider = token.firebase.sign_in_provider as SignInProvider;
    if (!allowedProviders.includes(signInProvider)) {
        throw new InvalidSignInProviderError();
    }

    return auth;
}
