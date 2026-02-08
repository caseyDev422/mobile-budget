# mobile-budget

A React Native mobile app built with Expo and Expo Router.

## What this app includes

- File-based navigation with `expo-router`
- A Home screen and Details screen (`app/index.tsx`, `app/details.tsx`)
- Tailwind-style utility classes via `nativewind`
- A sample global state store using `zustand` (`store/store.ts`)

## Prerequisites

- Node.js 20+
- pnpm (recommended for this repo) or npm
- Expo Go app on your device, or Android Studio / Xcode simulators

## Install dependencies

Using pnpm:

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

## Start the app

Start Metro/Expo dev server:

```bash
pnpm start
```

(or `npm run start`)

## Run on Android

```bash
pnpm android
```

(or `npm run android`)

This runs `expo start --android` and opens the app in an Android emulator/device.

## Run on iOS

```bash
pnpm ios
```

(or `npm run ios`)

This runs `expo start --ios` and opens the app in an iOS simulator/device.

Note: iOS simulator requires macOS with Xcode. On Windows, use a physical iOS device with Expo Go for iOS testing.

## Project scripts

- `pnpm start` - Start Expo dev server
- `pnpm android` - Launch Android target
- `pnpm ios` - Launch iOS target
- `pnpm web` - Run web target
- `pnpm lint` - Run ESLint + Prettier checks
- `pnpm format` - Auto-fix lint + format
