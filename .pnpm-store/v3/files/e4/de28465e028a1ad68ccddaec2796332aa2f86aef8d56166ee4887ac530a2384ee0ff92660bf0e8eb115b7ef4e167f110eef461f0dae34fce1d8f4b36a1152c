export interface OpaqueAnimation {
    idle: boolean;
    priority: number;
    advance(dt: number): void;
}
/**
 * The frameloop executes its animations in order of lowest priority first.
 * Animations are retained until idle.
 */
export declare const frameLoop: {
    readonly idle: boolean;
    /** Advance the given animation on every frame until idle. */
    start(animation: OpaqueAnimation): void;
    /** Advance all animations by the given time. */
    advance: typeof advance;
    /** Call this when an animation's priority changes. */
    sort(animation: OpaqueAnimation): void;
    /**
     * Clear all animations. For testing purposes.
     *
     * ☠️ Never call this from within the frameloop.
     */
    clear(): void;
};
declare function advance(dt: number): boolean;
export {};
