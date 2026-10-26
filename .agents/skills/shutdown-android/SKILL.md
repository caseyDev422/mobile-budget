---
name: shutdown-android
description: Stop this mobile-budget app's local Expo/Metro and API development servers, its Android emulator, and its PostgreSQL Compose services without stopping unrelated projects or physical Android devices.
---

# Shutdown Android app services

Use this skill when asked to shut down Android development servers for this repository. Run `scripts/shutdown.ps1` from the skill directory or any working directory; it resolves the repository from its own location.

The helper stops only Node processes whose command lines identify this repository's Expo/Metro client or `server` API. It uses `adb emu kill` to stop the selected Android emulator, then runs `docker compose stop` against this repository's `postgresql/compose.yaml` to stop its Postgres and pgAdmin services while preserving containers and data.

Only target emulator serials (`emulator-*`), never physical devices. If `ANDROID_SERIAL` selects a running emulator, stop that emulator; otherwise stop it only when exactly one emulator is running. If multiple emulators are running and no emulator is selected, leave them running and report the ambiguity. Do not stop every `node.exe`, kill processes solely because they own a common port, or use `docker compose down` / remove volumes. If `adb` is unavailable, report that the emulator was left running and continue. If Docker is unavailable, report that the app's Compose services were left running; still stop matching app Node servers and the selected emulator.
