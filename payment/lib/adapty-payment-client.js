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
exports.AdaptyPaymentClient = void 0;
const errors_1 = require("./errors");
const payment_client_1 = require("./payment-client");
class AdaptyPaymentClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        if (!this.apiKey) {
            throw new Error("API key is required for AdaptyApi");
        }
    }
    getProfile(customerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Api-Key ${this.apiKey}`);
            myHeaders.append("adapty-customer-user-id", customerUserId);
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
            const response = yield fetch("https://api.adapty.io/api/v2/server-side-api/profile/", requestOptions);
            const body = yield response.json();
            if (!response.ok) {
                this.handleError(body);
            }
            let profile;
            try {
                profile = this.mapProfileData(body.data);
            }
            catch (error) {
                throw new errors_1.PaymentError(`Failed to map profile data: ${error}`);
            }
            return profile;
        });
    }
    mapProfileData(data) {
        return new payment_client_1.Profile({
            appId: data.app_id,
            profileId: data.profile_id,
            customerUserId: data.customer_user_id,
            totalRevenueUsd: data.total_revenue_usd,
            segmentHash: data.segment_hash,
            timestamp: data.timestamp,
            customAttributes: data.custom_attributes,
            accessLevels: data.access_levels.map(this.mapAccessLevelData),
            subscriptions: data.subscriptions.map(this.mapSubscriptionData),
            nonSubscriptions: data.non_subscriptions.map(this.mapNonSubscriptionData),
        });
    }
    mapAccessLevelData(accessLevel) {
        return new payment_client_1.AccessLevel({
            accessLevelId: accessLevel.access_level_id,
            store: accessLevel.store,
            storeProductId: accessLevel.store_product_id,
            storeBasePlanId: accessLevel.store_base_plan_id,
            storeTransactionId: accessLevel.store_transaction_id,
            storeOriginalTransactionId: accessLevel.store_original_transaction_id,
            offer: accessLevel.offer,
            environment: accessLevel.environment,
            startsAt: accessLevel.starts_at ? new Date(accessLevel.starts_at) : undefined,
            purchasedAt: new Date(accessLevel.purchased_at),
            originallyPurchasedAt: new Date(accessLevel.originally_purchased_at),
            expiresAt: accessLevel.expires_at ? new Date(accessLevel.expires_at) : undefined,
            renewalCancelledAt: accessLevel.renewal_cancelled_at ?
                new Date(accessLevel.renewal_cancelled_at) :
                undefined,
            billingIssueDetectedAt: accessLevel.billing_issue_detected_at ?
                new Date(accessLevel.billing_issue_detected_at) :
                undefined,
            isInGracePeriod: accessLevel.is_in_grace_period,
            cancellationReason: accessLevel.cancellation_reason,
        });
    }
    mapSubscriptionData(subscription) {
        return new payment_client_1.Subscription({
            purchaseType: subscription.purchase_type,
            store: subscription.store,
            environment: subscription.environment,
            storeProductId: subscription.store_product_id,
            storeTransactionId: subscription.store_transaction_id,
            storeOriginalTransactionId: subscription.store_original_transaction_id,
            offer: subscription.offer,
            isFamilyShared: subscription.is_family_shared,
            price: subscription.price,
            purchasedAt: new Date(subscription.purchased_at),
            refundedAt: subscription.refunded_at ? new Date(subscription.refunded_at) : undefined,
            cancellationReason: subscription.cancellation_reason,
            variationId: subscription.variation_id,
            originallyPurchasedAt: new Date(subscription.originally_purchased_at),
            expiresAt: new Date(subscription.expires_at),
            renewStatus: subscription.renew_status,
            renewStatusChangedAt: subscription.renew_status_changed_at ?
                new Date(subscription.renew_status_changed_at) :
                undefined,
            billingIssueDetectedAt: subscription.billing_issue_detected_at ?
                new Date(subscription.billing_issue_detected_at) :
                undefined,
            gracePeriodExpiresAt: subscription.grace_period_expires_at ?
                new Date(subscription.grace_period_expires_at) :
                undefined,
        });
    }
    mapNonSubscriptionData(nonSubscription) {
        return new payment_client_1.NonSubscription({
            purchaseId: nonSubscription.purchase_id,
            store: nonSubscription.store,
            storeProductId: nonSubscription.store_product_id,
            storeBasePlanId: nonSubscription.store_base_plan_id,
            storeTransactionId: nonSubscription.store_transaction_id,
            storeOriginalTransactionId: nonSubscription.store_original_transaction_id,
            purchasedAt: new Date(nonSubscription.purchased_at),
            environment: nonSubscription.environment,
            isRefund: nonSubscription.is_refund,
            isConsumable: nonSubscription.is_consumable,
        });
    }
    handleError(error) {
        const message = error.errors.map((error) => error.errors.join(" ")).join(" ");
        if (error.error_code === "value_error") {
            throw new errors_1.ValueError(message);
        }
        if (error.error_code === "not_authenticated") {
            throw new errors_1.UnauthorizedError(message);
        }
        if (error.error_code === "profile_does_not_exist") {
            throw new errors_1.NotFoundError(message);
        }
        throw new errors_1.PaymentError(`Unhandled error: ${message}`);
    }
}
exports.AdaptyPaymentClient = AdaptyPaymentClient;
