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

declare function meros<T = object>(response: IncomingMessage, options: {
    multiple: true;
}): Promise<IncomingMessage | AsyncGenerator<ReadonlyArray<Part<T, Buffer>>>>;
declare function meros<T = object>(response: IncomingMessage, options?: {
    multiple: false;
}): Promise<IncomingMessage | AsyncGenerator<Part<T, Buffer>>>;
declare function meros<T = object>(response: IncomingMessage, options?: Options): Promise<IncomingMessage | AsyncGenerator<Part<T, Buffer>>>;

export { meros };
