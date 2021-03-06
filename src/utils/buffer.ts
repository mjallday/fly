import { Duplex } from 'stream';
import { ivm } from '..';

export function bufferToStream(buffer: Buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset, buffer.byteOffset + buffer.byteLength
  )
}

export function transferInto(buffer: Buffer | ArrayBuffer | null): ivm.Copy<ArrayBuffer> | null {
  if (!buffer)
    return null
  if (buffer instanceof Buffer)
    return transferArrayBufferInto(bufferToArrayBuffer(buffer))
  else if (buffer instanceof ArrayBuffer)
    return transferArrayBufferInto(buffer)
  return null
}

function transferArrayBufferInto(buffer: ArrayBuffer) {
  return (new ivm.ExternalCopy(buffer, { transferOut: true })).copyInto({ release: true, transferIn: true });
}