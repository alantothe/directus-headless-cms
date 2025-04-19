
import { getPayload } from 'payload';
import payloadConfig from '../../../config/payload.config';

// ReturnType<typeof getPayload> === Promise<BasePayload>
let payloadPromise: ReturnType<typeof getPayload> | null = null;

/**
 * Returns the singleton Payload instance for your app.
 */
export function getPayloadInstance(): ReturnType<typeof getPayload> {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config: payloadConfig });
  }
  return payloadPromise;
}
