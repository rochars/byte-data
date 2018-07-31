/**
 * Write a string of UTF-8 characters as a byte buffer.
 * @param {string} str The string to pack.
 * @return {!Uint8Array|Array<number>} The buffer with the packed string written.
 */
function packString (str) {
  var buffer;
  if (typeof Uint8Array === 'function') {
    buffer =  new Uint8Array(utf8BufferSize(str));
  } else {
    buffer = [];
  }
  pack(str, buffer, 0);
  return buffer;
}
