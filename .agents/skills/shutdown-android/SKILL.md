---
name: shutdown-android
description: Stop this mobile-budget app's local Expo/Metro and API development servers, plus its PostgreSQL Compose services, without stopping unrelated projects or the Android emulator.
---

# Shutdown Android app services

Use this skill when asked to shut down Android development servers for this repository. Run `scripts/shutdown.ps1` from the skill directory or any working directory; it resolves the repository from its own location.

The helper stops only Node processes whose command lines identify this repository's Expo/Metro client or `server` API. It also runs `docker compose stop` against this repository's `postgresql/compose.yaml` to stop its Postgres and pgAdmin services while preserving containers and data.

Do not stop every `node.exe`, kill processes solely because they own a common port, stop the Android emulator, or use `docker compose down` / remove volumes. If Docker is unavailable, report that the app's Compose services were left running; still stop matching app Node servers.
