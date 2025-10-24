"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInProvider = exports.InvalidSignInProviderError = exports.EmailNotVerifiedError = exports.UnauthenticatedHttpsError = void 0;
exports.getAuthValidationConfig = getAuthValidationConfig;
exports.setAuthValidationConfig = setAuthValidationConfig;
exports.validateAuth = validateAuth;
class UnauthenticatedHttpsError extends Error {
}
exports.UnauthenticatedHttpsError = UnauthenticatedHttpsError;
class EmailNotVerifiedError extends Error {
}
exports.EmailNotVerifiedError = EmailNotVerifiedError;
class InvalidSignInProviderError extends Error {
}
exports.InvalidSignInProviderError = InvalidSignInProviderError;
var SignInProvider;
(function (SignInProvider) {
    SignInProvider["ANONYMOUS"] = "anonymous";
    SignInProvider["APPLE"] = "apple.com";
    SignInProvider["GOOGLE"] = "google.com";
})(SignInProvider || (exports.SignInProvider = SignInProvider = {}));
let authValidationConfig;
function getAuthValidationConfig() {
    return authValidationConfig;
}
function setAuthValidationConfig(config) {
    authValidationConfig = config;
}
function validateAuth(auth, config) {
    var _a, _b, _c;
    if (authValidationConfig == null) {
        throw new Error("Auth validation config is not set");
    }
    if (auth == null) {
        throw new UnauthenticatedHttpsError();
    }
    const token = auth.token;
    const allowNotVerifiedEmail = (_a = config === null || config === void 0 ? void 0 : config.allowNotVerifiedEmail) !== null && _a !== void 0 ? _a : authValidationConfig.allowNotVerifiedEmail;
    if (!allowNotVerifiedEmail) {
        const emailVerified = (_b = token.email_verified) !== null && _b !== void 0 ? _b : false;
        if (!emailVerified) {
            throw new EmailNotVerifiedError();
        }
    }
    const allowedProviders = (_c = config === null || config === void 0 ? void 0 : config.signInProviders) !== null && _c !== void 0 ? _c : authValidationConfig.allowedProviders;
    const signInProvider = token.firebase.sign_in_provider;
    if (!allowedProviders.includes(signInProvider)) {
        throw new InvalidSignInProviderError();
    }
    return auth;
}
