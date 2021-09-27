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

declare function meros<T = object>(response: Response, options: {
    multiple: true;
}): Promise<Response | AsyncGenerator<ReadonlyArray<Part<T, string>>>>;
declare function meros<T = object>(response: Response, options?: {
    multiple: false;
}): Promise<Response | AsyncGenerator<Part<T, string>>>;
declare function meros<T = object>(response: Response, options?: Options): Promise<Response | AsyncGenerator<Part<T, string>>>;

export { meros };
