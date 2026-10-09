import { Platform } from 'react-native';

const apiUrl = new URL(process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000');
// Android emulators reach the host computer through this address.
if (Platform.OS === 'android' && ['localhost', '127.0.0.1'].includes(apiUrl.hostname)) {
  apiUrl.hostname = '10.0.2.2';
}
const API_URL = apiUrl.toString();

type TrpcResponse<T> = {
  result?: {
    data: T;
  };
  error?: {
    message?: string;
  };
};

const getErrorMessage = (payload: TrpcResponse<unknown>) =>
  payload.error?.message ?? 'The server returned an unexpected response.';

async function readTrpcResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as TrpcResponse<T>;

  if (!response.ok || payload.error) {
    throw new Error(getErrorMessage(payload));
  }

  if (!payload.result) {
    throw new Error('The server response did not include a result.');
  }

  return payload.result.data;
}

export async function trpcQuery<T>(path: string, input?: unknown, signal?: AbortSignal): Promise<T> {
  const url = new URL(`/trpc/${path}`, API_URL);

  if (input !== undefined) {
    url.searchParams.set('input', JSON.stringify(input));
  }

  const response = await fetch(url.toString(), { signal });
  return readTrpcResponse<T>(response);
}

export async function trpcMutation<T>(path: string, input?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(new URL(`/trpc/${path}`, API_URL).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input ?? null),
    signal,
  });

  return readTrpcResponse<T>(response);
}
