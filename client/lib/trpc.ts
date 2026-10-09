import { Platform } from 'react-native';
import type { TrpcResponse } from '@/types/trpc';

const apiUrl = new URL(process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000');
// Android emulators reach the host computer through this address.
if (Platform.OS === 'android' && ['localhost', '127.0.0.1'].includes(apiUrl.hostname)) {
  apiUrl.hostname = '10.0.2.2';
}
const API_URL = apiUrl.toString();

function requestHeaders(path: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (path.startsWith('plaid.')) {
    const token = process.env.EXPO_PUBLIC_PLAID_APP_TOKEN;
    if (!token) throw new Error('Missing bank API token in client/.env.');
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

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

async function request<T>(url: URL, path: string, options: RequestInit, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  let timedOut = false;
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 45000);
  try {
    const response = await fetch(url.toString(), { ...options, headers: requestHeaders(path), signal: controller.signal });
    return await readTrpcResponse<T>(response);
  } catch (error) {
    if (timedOut) throw new Error('The server request timed out. Check the server connection and try again.');
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

export async function trpcQuery<T>(path: string, input?: unknown, signal?: AbortSignal): Promise<T> {
  const url = new URL(`/trpc/${path}`, API_URL);

  if (input !== undefined) {
    url.searchParams.set('input', JSON.stringify(input));
  }

  return request<T>(url, path, {}, signal);
}

export async function trpcMutation<T>(path: string, input?: unknown, signal?: AbortSignal): Promise<T> {
  return request<T>(new URL(`/trpc/${path}`, API_URL), path, {
    method: 'POST',
    body: JSON.stringify(input ?? null),
  }, signal);
}
