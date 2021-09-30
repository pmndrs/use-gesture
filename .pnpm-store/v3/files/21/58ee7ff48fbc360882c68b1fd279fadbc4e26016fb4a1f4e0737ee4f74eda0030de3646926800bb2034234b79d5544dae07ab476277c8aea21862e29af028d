export interface GetGPUTier {
    /**
     * URL of directory where benchmark data is hosted.
     *
     * @default https://unpkg.com/detect-gpu@{version}/dist/benchmarks
     */
    benchmarksURL?: string;
    /**
     * Optionally pass in a WebGL context to avoid creating a temporary one
     * internally.
     */
    glContext?: WebGLRenderingContext | WebGL2RenderingContext;
    /**
     * Whether to fail if the system performance is low or if no hardware GPU is
     * available.
     *
     * @default false
     */
    failIfMajorPerformanceCaveat?: boolean;
    /**
     * Framerate per tier for mobile devices.
     *
     * @defaultValue [0, 15, 30, 60]
     */
    mobileTiers?: number[];
    /**
     * Framerate per tier for desktop devices.
     *
     * @defaultValue [0, 15, 30, 60]
     */
    desktopTiers?: number[];
    /**
     * Optionally override specific parameters. Used mainly for testing.
     */
    override?: {
        renderer?: string;
        /**
         * Override whether device is an iPad.
         */
        isIpad?: boolean;
        /**
         * Override whether device is a mobile device.
         */
        isMobile?: boolean;
        /**
         * Override device screen size.
         */
        screenSize?: {
            width: number;
            height: number;
        };
        /**
         * Override how benchmark data is loaded
         */
        loadBenchmarks?: (file: string) => Promise<ModelEntry[]>;
    };
}
export declare type TierType = 'SSR' | 'WEBGL_UNSUPPORTED' | 'BLOCKLISTED' | 'FALLBACK' | 'BENCHMARK';
export declare type TierResult = {
    tier: number;
    type: TierType;
    isMobile?: boolean;
    fps?: number;
    gpu?: string;
    device?: string;
};
export declare type ModelEntryScreen = [number, number, number, string | undefined];
export declare type ModelEntry = [string, string, 0 | 1, ModelEntryScreen[]];
export declare const getGPUTier: ({ mobileTiers, desktopTiers, override, glContext, failIfMajorPerformanceCaveat, benchmarksURL, }?: GetGPUTier) => Promise<TierResult>;
