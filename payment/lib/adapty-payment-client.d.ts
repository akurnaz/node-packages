import { PaymentClient, Profile } from "./payment-client";
export declare class AdaptyPaymentClient implements PaymentClient {
    private readonly apiKey;
    constructor(apiKey: string);
    getProfile(customerUserId: string): Promise<Profile>;
    private mapProfileData;
    private mapAccessLevelData;
    private mapSubscriptionData;
    private mapNonSubscriptionData;
    private handleError;
}
