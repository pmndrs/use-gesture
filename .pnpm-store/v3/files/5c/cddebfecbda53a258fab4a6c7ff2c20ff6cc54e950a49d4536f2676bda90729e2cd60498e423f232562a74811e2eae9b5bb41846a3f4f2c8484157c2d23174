import { ClientTransporterOptions } from '@algolia/client-common';
import { CreateClient } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';
import { Transporter } from '@algolia/transporter';

export declare const createRecommendationClient: CreateClient<RecommendationClient, RecommendationClientOptions & ClientTransporterOptions>;

export declare const getPersonalizationStrategy: (base: RecommendationClient) => (requestOptions?: RequestOptions | undefined) => Readonly<Promise<GetPersonalizationStrategyResponse>>;

export declare type GetPersonalizationStrategyResponse = {
    /**
     * Events scoring
     */
    eventsScoring: Array<{
        eventName: string;
        eventType: string;
        score: number;
    }>;
    /**
     * Facets scoring
     */
    facetsScoring: Array<{
        facetName: string;
        score: number;
    }>;
    /**
     * Personalization impact
     */
    personalizationImpact: number;
};

export declare type PersonalizationStrategy = {
    /**
     * Events scoring
     */
    readonly eventsScoring: ReadonlyArray<{
        readonly eventName: string;
        readonly eventType: string;
        readonly score: number;
    }>;
    /**
     * Facets scoring
     */
    readonly facetsScoring: ReadonlyArray<{
        readonly facetName: string;
        readonly score: number;
    }>;
    /**
     * Personalization impact
     */
    readonly personalizationImpact: number;
};

export declare type RecommendationClient = {
    /**
     * The application id.
     */
    readonly appId: string;
    /**
     * The underlying transporter.
     */
    readonly transporter: Transporter;
};

export declare type RecommendationClientOptions = {
    /**
     * The application id.
     */
    readonly appId: string;
    /**
     * The api key.
     */
    readonly apiKey: string;
    /**
     * The prefered region.
     */
    readonly region?: string;
};

export declare const setPersonalizationStrategy: (base: RecommendationClient) => (personalizationStrategy: PersonalizationStrategy, requestOptions?: RequestOptions | undefined) => Readonly<Promise<SetPersonalizationStrategyResponse>>;

export declare type SetPersonalizationStrategyResponse = {
    /**
     * The status code.
     */
    status?: number;
    /**
     * The message.
     */
    message: string;
};

export { }
