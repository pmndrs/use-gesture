/// <reference types="react" />
/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */
export declare function composeEventHandlers<EventType extends React.SyntheticEvent | Event>(theirHandler: ((event: EventType) => any) | undefined, ourHandler: (event: EventType) => any): (event: EventType) => any;
