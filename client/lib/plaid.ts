import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import { trpcMutation } from '@/lib/trpc';
import type { BankData, LinkTokenResult, PlaidLinkResult } from '@/types/plaid';

export async function connectBankAccount(update = false, signal?: AbortSignal) {
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    throw new Error('Plaid requires a native Android development build and cannot run in Expo Go.');
  }
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    throw new Error('Bank linking is available on Android and iOS.');
  }
  let createSession: typeof import('react-native-plaid-link-sdk').createPlaidLinkSession;
  try {
    ({ createPlaidLinkSession: createSession } = await import('react-native-plaid-link-sdk'));
  } catch {
    throw new Error('The Plaid native module is missing. Rebuild the Android app.');
  }
  const { linkToken } = await trpcMutation<LinkTokenResult>('plaid.createLinkToken', {
    platform: Platform.OS,
    update,
  }, signal);

  const success = await new Promise<PlaidLinkResult | null>((resolve, reject) => {
    void createSession({
      token: linkToken,
      onSuccess: (result) => resolve({ publicToken: result.publicToken }),
      onExit: (exit) => {
        if (exit.error) reject(new Error(exit.error.displayMessage || exit.error.errorMessage));
        else resolve(null);
      },
      onEvent: () => undefined,
    }).then((session) => session.open()).catch(reject);
  });
  if (!success) return false;
  if (!update) {
    if (!success.publicToken) throw new Error('Plaid did not return a bank connection token.');
    // Complete the durable exchange even if this screen unmounts after Link succeeds.
    await trpcMutation('plaid.exchangePublicToken', { publicToken: success.publicToken });
  }
  return true;
}

function delay(signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(new Error('Bank request cancelled.'));
    const onAbort = () => {
      clearTimeout(timer);
      reject(new Error('Bank request cancelled.'));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, 4000);
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

export async function loadBankData(signal: AbortSignal) {
  for (let attempt = 0; ; attempt++) {
    const data = await trpcMutation<BankData>('plaid.syncBankData', { refreshBalances: attempt === 0 }, signal);
    if (data.transactions.length || data.syncStatus === 'HISTORICAL_UPDATE_COMPLETE' || attempt >= 5) return data;
    await delay(signal);
  }
}
