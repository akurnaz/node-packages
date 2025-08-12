"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.NonSubscription = exports.Subscription = exports.AccessLevel = exports.Price = exports.Offer = void 0;
const lib_1 = require("../../commons/lib");
class Offer {
    constructor(props) {
        this.category = props.category;
        this.type = props.type;
        this.id = props.id;
    }
}
exports.Offer = Offer;
class Price {
    constructor(props) {
        this.country = props.country;
        this.currency = props.currency;
        this.value = props.value;
    }
}
exports.Price = Price;
class AccessLevel {
    constructor(props) {
        this.accessLevelId = (0, lib_1.requireNonNull)(props.accessLevelId);
        this.store = (0, lib_1.requireNonNull)(props.store);
        this.storeProductId = (0, lib_1.requireNonNull)(props.storeProductId);
        this.storeBasePlanId = props.storeBasePlanId;
        this.storeTransactionId = (0, lib_1.requireNonNull)(props.storeTransactionId);
        this.storeOriginalTransactionId = (0, lib_1.requireNonNull)(props.storeOriginalTransactionId);
        this.offer = props.offer;
        this.environment = props.environment;
        this.startsAt = props.startsAt;
        this.purchasedAt = (0, lib_1.requireNonNull)(props.purchasedAt);
        this.originallyPurchasedAt = (0, lib_1.requireNonNull)(props.originallyPurchasedAt);
        this.expiresAt = props.expiresAt;
        this.renewalCancelledAt = props.renewalCancelledAt;
        this.billingIssueDetectedAt = props.billingIssueDetectedAt;
        this.isInGracePeriod = (0, lib_1.requireNonNull)(props.isInGracePeriod);
        this.cancellationReason = props.cancellationReason;
    }
    isActive(date) {
        if (this.startsAt != null) {
            if (this.startsAt > date) {
                return false; // Not started yet
            }
        }
        if (this.expiresAt == null) {
            return true; // null for lifetime access.
        }
        return date < this.expiresAt;
    }
    isLifetime() {
        return this.expiresAt == null;
    }
    isRefund() {
        return this.cancellationReason == "refund";
    }
    willRenew() {
        return this.renewalCancelledAt == null && this.isInGracePeriod == false;
    }
}
exports.AccessLevel = AccessLevel;
class Subscription {
    constructor(props) {
        this.purchaseType = props.purchaseType;
        this.store = (0, lib_1.requireNonNull)(props.store);
        this.environment = (0, lib_1.requireNonNull)(props.environment);
        this.storeProductId = (0, lib_1.requireNonNull)(props.storeProductId);
        this.storeTransactionId = (0, lib_1.requireNonNull)(props.storeTransactionId);
        this.storeOriginalTransactionId = (0, lib_1.requireNonNull)(props.storeOriginalTransactionId);
        this.offer = props.offer;
        this.isFamilyShared = props.isFamilyShared;
        this.price = props.price;
        this.purchasedAt = (0, lib_1.requireNonNull)(props.purchasedAt);
        this.refundedAt = props.refundedAt;
        this.cancellationReason = props.cancellationReason;
        this.variationId = props.variationId;
        this.originallyPurchasedAt = (0, lib_1.requireNonNull)(props.originallyPurchasedAt);
        this.expiresAt = (0, lib_1.requireNonNull)(props.expiresAt);
        this.renewStatus = props.renewStatus;
        this.renewStatusChangedAt = props.renewStatusChangedAt;
        this.billingIssueDetectedAt = props.billingIssueDetectedAt;
        this.gracePeriodExpiresAt = props.gracePeriodExpiresAt;
    }
    get productId() {
        return this.storeProductId;
    }
    get transactionId() {
        return this.storeTransactionId;
    }
    get startDate() {
        return this.purchasedAt;
    }
    get expiryDate() {
        return this.expiresAt;
    }
    get refunded() {
        return this.cancellationReason === "refund";
    }
}
exports.Subscription = Subscription;
class NonSubscription {
    constructor(props) {
        this.purchaseId = (0, lib_1.requireNonNull)(props.purchaseId);
        this.store = (0, lib_1.requireNonNull)(props.store);
        this.storeProductId = (0, lib_1.requireNonNull)(props.storeProductId);
        this.storeBasePlanId = props.storeBasePlanId;
        this.storeTransactionId = (0, lib_1.requireNonNull)(props.storeTransactionId);
        this.storeOriginalTransactionId = (0, lib_1.requireNonNull)(props.storeOriginalTransactionId);
        this.purchasedAt = (0, lib_1.requireNonNull)(props.purchasedAt);
        this.environment = (0, lib_1.requireNonNull)(props.environment);
        this.isRefund = (0, lib_1.requireNonNull)(props.isRefund);
        this.isConsumable = (0, lib_1.requireNonNull)(props.isConsumable);
    }
    get productId() {
        return this.storeProductId;
    }
    get transactionId() {
        return this.storeTransactionId;
    }
    get startDate() {
        return this.purchasedAt;
    }
    get expiryDate() {
        return undefined;
    }
    get refunded() {
        return this.isRefund;
    }
}
exports.NonSubscription = NonSubscription;
class Profile {
    constructor(props) {
        this.appId = (0, lib_1.requireNonNull)(props.appId);
        this.profileId = (0, lib_1.requireNonNull)(props.profileId);
        this.customerUserId = props.customerUserId;
        this.totalRevenueUsd = (0, lib_1.requireNonNull)(props.totalRevenueUsd);
        this.segmentHash = (0, lib_1.requireNonNull)(props.segmentHash);
        this.timestamp = (0, lib_1.requireNonNull)(props.timestamp);
        this.customAttributes = (0, lib_1.requireNonNull)(props.customAttributes);
        this.accessLevels = (0, lib_1.requireNonNull)(props.accessLevels);
        this.subscriptions = (0, lib_1.requireNonNull)(props.subscriptions);
        this.nonSubscriptions = (0, lib_1.requireNonNull)(props.nonSubscriptions);
    }
    get purchases() {
        return [...this.subscriptions, ...this.nonSubscriptions];
    }
}
exports.Profile = Profile;
