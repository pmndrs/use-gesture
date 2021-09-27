import { Blob } from 'blob-polyfill';

function fixBinary(bin) {
  var length = bin.length;
  var buf = new ArrayBuffer(length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < length; i++) {
    arr[i] = bin.charCodeAt(i);
  }

  return buf;
} // polyfill for SSR as atob is not available - https://gist.github.com/jmshal/b14199f7402c8f3a4568733d8bed0f25


const atobPolyfill = a => typeof window === 'undefined' ? Buffer.from(a, 'base64').toString('binary') : atob(a);

const createImageUrl = (blob, type) => URL.createObjectURL(new Blob([fixBinary(atobPolyfill(blob))], {
  type
}));

export { createImageUrl };
