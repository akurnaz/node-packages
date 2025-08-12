import { requireNonNull } from "../../commons/lib";

export type Store = "app_store" | "play_store" | "stripe";
type Environment = "Sandbox" | "Production";
type CancellationReason =
    | "voluntarily_cancelled"
    | "billing_error"
    | "price_increase"
    | "product_was_not_available"
    | "refund"
    | "upgraded"
    | "unknown";
type OfferCategory = "introductory" | "promotional" | "offer_code" | "win_back";
type OfferType = "free_trial" | "pay_as_you_go" | "pay_up_front" | "unknown";
type SubscriptionPurchaseType = "subscription";

export class Offer {
    public readonly category: OfferCategory;
    public readonly type: OfferType;
    public readonly id?: string;

    constructor(props: {
        category: OfferCategory,
        type: OfferType,
        id?: string
    }) {
        this.category = props.category;
        this.type = props.type;
        this.id = props.id;
    }
}

export class Price {
    public readonly country: string;
    public readonly currency: string;
    public readonly value: number;

    constructor(props: {
        country: string,
        currency: string,
        value: number
    }) {
        this.country = props.country;
        this.currency = props.currency;
        this.value = props.value;
    }
}

export class AccessLevel {
    public readonly accessLevelId: string; // this.id
    public readonly store: Store;
    public readonly storeProductId: string; // this.vendorProductId
    public readonly storeBasePlanId?: string;
    public readonly storeTransactionId: string;
    public readonly storeOriginalTransactionId: string;
    public readonly offer?: Offer; // this.offerId
    public readonly environment?: Environment;
    public readonly startsAt?: Date;
    public readonly purchasedAt: Date; // this.renewedAt
    public readonly originallyPurchasedAt: Date; // this.activatedAt
    public readonly expiresAt?: Date;
    public readonly renewalCancelledAt?: Date; // this.unsubscribedAt
    public readonly billingIssueDetectedAt?: Date;
    public readonly isInGracePeriod: boolean;
    public readonly cancellationReason?: CancellationReason;

    constructor(props: {
        accessLevelId: string,
        store: Store,
        storeProductId: string,
        storeBasePlanId?: string,
        storeTransactionId: string,
        storeOriginalTransactionId: string,
        offer?: Offer,
        environment?: Environment,
        startsAt?: Date,
        purchasedAt: Date,
        originallyPurchasedAt: Date,
        expiresAt?: Date,
        renewalCancelledAt?: Date,
        billingIssueDetectedAt?: Date,
        isInGracePeriod: boolean,
        cancellationReason?: CancellationReason
    }) {
        this.accessLevelId = requireNonNull(props.accessLevelId);
        this.store = requireNonNull(props.store);
        this.storeProductId = requireNonNull(props.storeProductId);
        this.storeBasePlanId = props.storeBasePlanId;
        this.storeTransactionId = requireNonNull(props.storeTransactionId);
        this.storeOriginalTransactionId = requireNonNull(props.storeOriginalTransactionId);
        this.offer = props.offer;
        this.environment = props.environment;
        this.startsAt = props.startsAt;
        this.purchasedAt = requireNonNull(props.purchasedAt);
        this.originallyPurchasedAt = requireNonNull(props.originallyPurchasedAt);
        this.expiresAt = props.expiresAt;
        this.renewalCancelledAt = props.renewalCancelledAt;
        this.billingIssueDetectedAt = props.billingIssueDetectedAt;
        this.isInGracePeriod = requireNonNull(props.isInGracePeriod);
        this.cancellationReason = props.cancellationReason;
    }

    public isActive(date: Date): boolean {
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

    public isLifetime(): boolean {
        return this.expiresAt == null;
    }

    public isRefund(): boolean {
        return this.cancellationReason == "refund";
    }

    public willRenew(): boolean {
        return this.renewalCancelledAt == null && this.isInGracePeriod == false;
    }
}

export interface Purchase {
    get store(): Store;
    get productId(): string;
    get transactionId(): string;
    get startDate(): Date;
    get expiryDate(): Date | undefined;
    get refunded(): boolean;
}

export class Subscription implements Purchase {
    public readonly purchaseType?: SubscriptionPurchaseType;
    public readonly store: Store;
    public readonly environment: Environment;
    public readonly storeProductId: string; // this.vendorProductId
    public readonly storeTransactionId: string; // this.vendorTransactionId
    public readonly storeOriginalTransactionId: string; // this.vendorOriginalTransactionId
    public readonly offer?: Offer;
    public readonly isFamilyShared?: boolean;
    public readonly price?: Price;
    public readonly purchasedAt: Date; // this.renewedAt
    public readonly refundedAt?: Date;
    public readonly cancellationReason?: CancellationReason;
    public readonly variationId?: string;
    public readonly originallyPurchasedAt: Date; // this.activatedAt
    public readonly expiresAt: Date;
    public readonly renewStatus?: boolean;
    public readonly renewStatusChangedAt?: Date;
    public readonly billingIssueDetectedAt?: Date;
    public readonly gracePeriodExpiresAt?: Date;

    constructor(props: {
        purchaseType?: SubscriptionPurchaseType,
        store: Store,
        environment: Environment,
        storeProductId: string,
        storeTransactionId: string,
        storeOriginalTransactionId: string,
        offer?: Offer,
        isFamilyShared?: boolean,
        price?: Price,
        purchasedAt: Date,
        refundedAt?: Date,
        cancellationReason?: CancellationReason,
        variationId?: string,
        originallyPurchasedAt: Date,
        expiresAt: Date,
        renewStatus?: boolean,
        renewStatusChangedAt?: Date,
        billingIssueDetectedAt?: Date,
        gracePeriodExpiresAt?: Date
    }) {
        this.purchaseType = props.purchaseType;
        this.store = requireNonNull(props.store);
        this.environment = requireNonNull(props.environment);
        this.storeProductId = requireNonNull(props.storeProductId);
        this.storeTransactionId = requireNonNull(props.storeTransactionId);
        this.storeOriginalTransactionId = requireNonNull(props.storeOriginalTransactionId);
        this.offer = props.offer;
        this.isFamilyShared = props.isFamilyShared;
        this.price = props.price;
        this.purchasedAt = requireNonNull(props.purchasedAt);
        this.refundedAt = props.refundedAt;
        this.cancellationReason = props.cancellationReason;
        this.variationId = props.variationId;
        this.originallyPurchasedAt = requireNonNull(props.originallyPurchasedAt);
        this.expiresAt = requireNonNull(props.expiresAt);
        this.renewStatus = props.renewStatus;
        this.renewStatusChangedAt = props.renewStatusChangedAt;
        this.billingIssueDetectedAt = props.billingIssueDetectedAt;
        this.gracePeriodExpiresAt = props.gracePeriodExpiresAt;
    }

    public get productId(): string {
        return this.storeProductId;
    }

    public get transactionId(): string {
        return this.storeTransactionId;
    }

    public get startDate(): Date {
        return this.purchasedAt;
    }

    public get expiryDate(): Date {
        return this.expiresAt;
    }

    public get refunded(): boolean {
        return this.cancellationReason === "refund";
    }
}

export class NonSubscription implements Purchase {
    public readonly purchaseId: string;
    public readonly store: Store;
    public readonly storeProductId: string; // this.vendorProductId
    public readonly storeBasePlanId?: string;
    public readonly storeTransactionId: string; // this.vendorTransactionId
    public readonly storeOriginalTransactionId: string;
    public readonly purchasedAt: Date;
    public readonly environment: Environment;
    public readonly isRefund: boolean;
    public readonly isConsumable: boolean;

    constructor(props: {
        purchaseId: string,
        store: Store,
        storeProductId: string,
        storeBasePlanId?: string,
        storeTransactionId: string,
        storeOriginalTransactionId: string,
        purchasedAt: Date,
        environment: Environment,
        isRefund: boolean,
        isConsumable: boolean
    }) {
        this.purchaseId = requireNonNull(props.purchaseId);
        this.store = requireNonNull(props.store);
        this.storeProductId = requireNonNull(props.storeProductId);
        this.storeBasePlanId = props.storeBasePlanId;
        this.storeTransactionId = requireNonNull(props.storeTransactionId);
        this.storeOriginalTransactionId = requireNonNull(props.storeOriginalTransactionId);
        this.purchasedAt = requireNonNull(props.purchasedAt);
        this.environment = requireNonNull(props.environment);
        this.isRefund = requireNonNull(props.isRefund);
        this.isConsumable = requireNonNull(props.isConsumable);
    }

    public get productId(): string {
        return this.storeProductId;
    }

    public get transactionId(): string {
        return this.storeTransactionId;
    }

    public get startDate(): Date {
        return this.purchasedAt;
    }

    public get expiryDate(): Date | undefined {
        return undefined;
    }

    public get refunded(): boolean {
        return this.isRefund;
    }
}

export class Profile {
    public readonly appId: string;
    public readonly profileId: string;
    public readonly customerUserId?: string;
    public readonly totalRevenueUsd: number;
    public readonly segmentHash: string;
    public readonly timestamp: number;
    public readonly customAttributes: unknown[];
    public readonly accessLevels: AccessLevel[];
    public readonly subscriptions: Subscription[];
    public readonly nonSubscriptions: NonSubscription[];

    constructor(props: {
        appId: string,
        profileId: string,
        customerUserId?: string,
        totalRevenueUsd: number,
        segmentHash: string,
        timestamp: number,
        customAttributes: unknown[],
        accessLevels: AccessLevel[],
        subscriptions: Subscription[],
        nonSubscriptions: NonSubscription[]
    }) {
        this.appId = requireNonNull(props.appId);
        this.profileId = requireNonNull(props.profileId);
        this.customerUserId = props.customerUserId;
        this.totalRevenueUsd = requireNonNull(props.totalRevenueUsd);
        this.segmentHash = requireNonNull(props.segmentHash);
        this.timestamp = requireNonNull(props.timestamp);
        this.customAttributes = requireNonNull(props.customAttributes);
        this.accessLevels = requireNonNull(props.accessLevels);
        this.subscriptions = requireNonNull(props.subscriptions);
        this.nonSubscriptions = requireNonNull(props.nonSubscriptions);
    }

    public get purchases(): Purchase[] {
        return [...this.subscriptions, ...this.nonSubscriptions];
    }
}

export interface PaymentClient {
    getProfile(customerUserId: string): Promise<Profile>;
}

