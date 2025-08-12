export type Store = "app_store" | "play_store" | "stripe";
type Environment = "Sandbox" | "Production";
type CancellationReason = "voluntarily_cancelled" | "billing_error" | "price_increase" | "product_was_not_available" | "refund" | "upgraded" | "unknown";
type OfferCategory = "introductory" | "promotional" | "offer_code" | "win_back";
type OfferType = "free_trial" | "pay_as_you_go" | "pay_up_front" | "unknown";
type SubscriptionPurchaseType = "subscription";
export declare class Offer {
    readonly category: OfferCategory;
    readonly type: OfferType;
    readonly id?: string;
    constructor(props: {
        category: OfferCategory;
        type: OfferType;
        id?: string;
    });
}
export declare class Price {
    readonly country: string;
    readonly currency: string;
    readonly value: number;
    constructor(props: {
        country: string;
        currency: string;
        value: number;
    });
}
export declare class AccessLevel {
    readonly accessLevelId: string;
    readonly store: Store;
    readonly storeProductId: string;
    readonly storeBasePlanId?: string;
    readonly storeTransactionId: string;
    readonly storeOriginalTransactionId: string;
    readonly offer?: Offer;
    readonly environment?: Environment;
    readonly startsAt?: Date;
    readonly purchasedAt: Date;
    readonly originallyPurchasedAt: Date;
    readonly expiresAt?: Date;
    readonly renewalCancelledAt?: Date;
    readonly billingIssueDetectedAt?: Date;
    readonly isInGracePeriod: boolean;
    readonly cancellationReason?: CancellationReason;
    constructor(props: {
        accessLevelId: string;
        store: Store;
        storeProductId: string;
        storeBasePlanId?: string;
        storeTransactionId: string;
        storeOriginalTransactionId: string;
        offer?: Offer;
        environment?: Environment;
        startsAt?: Date;
        purchasedAt: Date;
        originallyPurchasedAt: Date;
        expiresAt?: Date;
        renewalCancelledAt?: Date;
        billingIssueDetectedAt?: Date;
        isInGracePeriod: boolean;
        cancellationReason?: CancellationReason;
    });
    isActive(date: Date): boolean;
    isLifetime(): boolean;
    isRefund(): boolean;
    willRenew(): boolean;
}
export interface Purchase {
    get store(): Store;
    get productId(): string;
    get transactionId(): string;
    get startDate(): Date;
    get expiryDate(): Date | undefined;
    get refunded(): boolean;
}
export declare class Subscription implements Purchase {
    readonly purchaseType?: SubscriptionPurchaseType;
    readonly store: Store;
    readonly environment: Environment;
    readonly storeProductId: string;
    readonly storeTransactionId: string;
    readonly storeOriginalTransactionId: string;
    readonly offer?: Offer;
    readonly isFamilyShared?: boolean;
    readonly price?: Price;
    readonly purchasedAt: Date;
    readonly refundedAt?: Date;
    readonly cancellationReason?: CancellationReason;
    readonly variationId?: string;
    readonly originallyPurchasedAt: Date;
    readonly expiresAt: Date;
    readonly renewStatus?: boolean;
    readonly renewStatusChangedAt?: Date;
    readonly billingIssueDetectedAt?: Date;
    readonly gracePeriodExpiresAt?: Date;
    constructor(props: {
        purchaseType?: SubscriptionPurchaseType;
        store: Store;
        environment: Environment;
        storeProductId: string;
        storeTransactionId: string;
        storeOriginalTransactionId: string;
        offer?: Offer;
        isFamilyShared?: boolean;
        price?: Price;
        purchasedAt: Date;
        refundedAt?: Date;
        cancellationReason?: CancellationReason;
        variationId?: string;
        originallyPurchasedAt: Date;
        expiresAt: Date;
        renewStatus?: boolean;
        renewStatusChangedAt?: Date;
        billingIssueDetectedAt?: Date;
        gracePeriodExpiresAt?: Date;
    });
    get productId(): string;
    get transactionId(): string;
    get startDate(): Date;
    get expiryDate(): Date;
    get refunded(): boolean;
}
export declare class NonSubscription implements Purchase {
    readonly purchaseId: string;
    readonly store: Store;
    readonly storeProductId: string;
    readonly storeBasePlanId?: string;
    readonly storeTransactionId: string;
    readonly storeOriginalTransactionId: string;
    readonly purchasedAt: Date;
    readonly environment: Environment;
    readonly isRefund: boolean;
    readonly isConsumable: boolean;
    constructor(props: {
        purchaseId: string;
        store: Store;
        storeProductId: string;
        storeBasePlanId?: string;
        storeTransactionId: string;
        storeOriginalTransactionId: string;
        purchasedAt: Date;
        environment: Environment;
        isRefund: boolean;
        isConsumable: boolean;
    });
    get productId(): string;
    get transactionId(): string;
    get startDate(): Date;
    get expiryDate(): Date | undefined;
    get refunded(): boolean;
}
export declare class Profile {
    readonly appId: string;
    readonly profileId: string;
    readonly customerUserId?: string;
    readonly totalRevenueUsd: number;
    readonly segmentHash: string;
    readonly timestamp: number;
    readonly customAttributes: unknown[];
    readonly accessLevels: AccessLevel[];
    readonly subscriptions: Subscription[];
    readonly nonSubscriptions: NonSubscription[];
    constructor(props: {
        appId: string;
        profileId: string;
        customerUserId?: string;
        totalRevenueUsd: number;
        segmentHash: string;
        timestamp: number;
        customAttributes: unknown[];
        accessLevels: AccessLevel[];
        subscriptions: Subscription[];
        nonSubscriptions: NonSubscription[];
    });
    get purchases(): Purchase[];
}
export interface PaymentClient {
    getProfile(customerUserId: string): Promise<Profile>;
}
export {};
