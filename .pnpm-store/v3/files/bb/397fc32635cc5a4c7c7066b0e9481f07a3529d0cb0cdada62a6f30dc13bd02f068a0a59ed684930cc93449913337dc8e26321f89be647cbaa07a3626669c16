const separator = '\r\n\r\n';
async function* generate(stream, boundary, options) {
    const len_boundary = Buffer.byteLength(boundary), is_eager = !options || !options.multiple;
    let buffer = Buffer.alloc(0), is_preamble = true, payloads = [];
    outer: for await (const chunk of stream) {
        let idx_boundary = buffer.byteLength;
        buffer = Buffer.concat([buffer, chunk]);
        const idx_chunk = chunk.indexOf(boundary);
        if (!!~idx_chunk) {
            // chunk itself had `boundary` marker
            idx_boundary += idx_chunk;
        }
        else {
            // search combined (boundary can be across chunks)
            idx_boundary = buffer.indexOf(boundary);
        }
        payloads = [];
        while (!!~idx_boundary) {
            const current = buffer.slice(0, idx_boundary);
            const next = buffer.slice(idx_boundary + len_boundary);
            if (is_preamble) {
                is_preamble = false;
            }
            else {
                const headers = {};
                const idx_headers = current.indexOf(separator);
                const arr_headers = buffer.slice(0, idx_headers).toString().trim().split(/\r\n/);
                // parse headers
                let tmp;
                while (tmp = arr_headers.shift()) {
                    tmp = tmp.split(': ');
                    headers[tmp.shift().toLowerCase()] = tmp.join(': ');
                }
                let body = current.slice(idx_headers + separator.length, current.lastIndexOf('\r\n'));
                let is_json = false;
                tmp = headers['content-type'];
                if (tmp && !!~tmp.indexOf('application/json')) {
                    try {
                        body = JSON.parse(body.toString());
                        is_json = true;
                    }
                    catch (_) {
                    }
                }
                tmp = { headers, body, json: is_json };
                is_eager ? yield tmp : payloads.push(tmp);
                // hit a tail boundary, break
                if (next.slice(0, 2).toString() === '--')
                    break outer;
            }
            buffer = next;
            idx_boundary = buffer.indexOf(boundary);
        }
        if (payloads.length)
            yield payloads;
    }
    if (payloads.length)
        yield payloads;
}

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
async function meros(response, options) {
    const ctype = response.headers['content-type'];
    if (!ctype || !~ctype.indexOf('multipart/mixed'))
        return response;
    const idx_boundary = ctype.indexOf('boundary=');
    return generate(response, `--${!!~idx_boundary
        ? // +9 for 'boundary='.length
            ctype.substring(idx_boundary + 9).trim().replace(/['"]/g, '')
        : '-'}`, options);
}

exports.meros = meros;
