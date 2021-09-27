/// <reference types="node" />
import { IncomingMessage } from 'http';

interface Options {
	/**
	 * Setting this to true will yield an array. In other words; instead of yielding once for every payload—we collect
	 * all complete payloads for a chunk and then yield.
	 *
	 * @default false
	 */
	multiple: boolean;
}

type Part<Body, Fallback> =
	| { json: false; headers: Record<string, string>; body: Fallback }
	| { json: true; headers: Record<string, string>; body: Body };

// Browser~

declare function meros<T = object>(
	response: Response,
	options: {
		multiple: true;
	},
): Promise<Response | AsyncGenerator<ReadonlyArray<Part<T, Buffer>>>>;
declare function meros<T = object>(
	response: Response,
	options?: {
		multiple: false;
	},
): Promise<Response | AsyncGenerator<Part<T, Buffer>>>;
/**
 * Yield immediately for every part made available on the response. If the `content-type` of the response isn't a
 * multipart body, then we'll resolve with {@link Response}.
 *
 * @example
 *
 * ```js
 * const parts = await fetch('/fetch-multipart')
 *      .then(meros);
 *
 * for await (const part of parts) {
 *     // do something with this part
 * }
 * ```
 */
declare function meros<T = object>(
	response: Response,
	options?: Options,
): Promise<Response | AsyncGenerator<Part<T, Buffer>>>;

// Node~

declare function meros<T = object>(
	response: IncomingMessage,
	options: {
		multiple: true;
	},
): Promise<IncomingMessage | AsyncGenerator<ReadonlyArray<Part<T, Buffer>>>>;
declare function meros<T = object>(
	response: IncomingMessage,
	options?: {
		multiple: false;
	},
): Promise<IncomingMessage | AsyncGenerator<Part<T, Buffer>>>;
/**
 * Yield immediately for every part made available on the response. If the `content-type` of the response isn't a
 * multipart body, then we'll resolve with {@link IncomingMessage}.
 *
 * @example
 *
 * ```js
 * const response = await new Promise((resolve) => {
 *   const request = http.get(`http://my-domain/mock-ep`, (response) => {
 *   	resolve(response);
 *   });
 *   request.end();
 * });
 *
 * const parts = await meros(response);
 *
 * for await (const part of parts) {
 *     // do something with this part
 * }
 * ```
 */
declare function meros<T = object>(
	response: IncomingMessage,
	options?: Options,
): Promise<IncomingMessage | AsyncGenerator<Part<T, Buffer>>>;

export { meros };
