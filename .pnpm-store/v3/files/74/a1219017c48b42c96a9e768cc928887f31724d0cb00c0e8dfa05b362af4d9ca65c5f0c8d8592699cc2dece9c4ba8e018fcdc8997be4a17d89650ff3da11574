const separator = '\r\n\r\n';
const decoder = new TextDecoder;
async function* generate(stream, boundary, options) {
    const reader = stream.getReader(), is_eager = !options || !options.multiple;
    let buffer = '', is_preamble = true, payloads = [];
    try {
        let result;
        outer: while (!(result = await reader.read()).done) {
            const chunk = decoder.decode(result.value);
            const idx_chunk = chunk.indexOf(boundary);
            let idx_boundary = buffer.length;
            buffer += chunk;
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
                const current = buffer.substring(0, idx_boundary);
                const next = buffer.substring(idx_boundary + boundary.length);
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
                    let body = current.substring(idx_headers + separator.length, current.lastIndexOf('\r\n'));
                    let is_json = false;
                    tmp = headers['content-type'];
                    if (tmp && !!~tmp.indexOf('application/json')) {
                        try {
                            body = JSON.parse(body);
                            is_json = true;
                        }
                        catch (_) {
                        }
                    }
                    tmp = { headers, body, json: is_json };
                    is_eager ? yield tmp : payloads.push(tmp);
                    // hit a tail boundary, break
                    if (next.substring(0, 2) === '--')
                        break outer;
                }
                buffer = next;
                idx_boundary = buffer.indexOf(boundary);
            }
            if (payloads.length)
                yield payloads;
        }
    }
    finally {
        if (payloads.length)
            yield payloads;
        reader.releaseLock();
    }
}

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
async function meros(response, options) {
    if (!response.ok || !response.body || response.bodyUsed)
        return response;
    const ctype = response.headers.get('content-type');
    if (!ctype || !~ctype.indexOf('multipart/mixed'))
        return response;
    const idx_boundary = ctype.indexOf('boundary=');
    return generate(response.body, `--${!!~idx_boundary
        ? // +9 for 'boundary='.length
            ctype.substring(idx_boundary + 9).trim().replace(/['"]/g, '')
        : '-'}`, options);
}

exports.meros = meros;
