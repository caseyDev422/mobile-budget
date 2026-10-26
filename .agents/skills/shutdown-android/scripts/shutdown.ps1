$ErrorActionPreference = 'Stop'

$appRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..')).Path.TrimEnd('\')
$clientRoot = Join-Path $appRoot 'client'
$serverRoot = Join-Path $appRoot 'server'
$composeFile = Join-Path $appRoot 'postgresql\compose.yaml'

function Test-UnderPath([string] $CommandLine, [string] $Path) {
    return $CommandLine.IndexOf($Path, [StringComparison]::OrdinalIgnoreCase) -ge 0
}

$targets = @(
    Get-CimInstance Win32_Process | Where-Object {
        if ($_.Name -ne 'node.exe' -or -not $_.CommandLine) { return $false }

        $isExpo = (Test-UnderPath $_.CommandLine $clientRoot) -and
            ($_.CommandLine -match '(?i)expo|metro')
        $isApi = (Test-UnderPath $_.CommandLine $serverRoot) -and
            ($_.CommandLine -match '(?i)tsx|src[\\/]index\.ts|dist[\\/]index\.js')
        return $isExpo -or $isApi
    }
)

foreach ($target in $targets) {
    Stop-Process -Id $target.ProcessId -Force -ErrorAction SilentlyContinue
}
Write-Output "Stopped $($targets.Count) matching mobile-budget Node server process(es)."

$adb = Get-Command adb -ErrorAction SilentlyContinue
if (-not $adb) {
    Write-Warning 'adb is unavailable; the Android emulator was not stopped.'
} else {
    $deviceOutput = & $adb.Source devices
    if ($LASTEXITCODE -ne 0) {
        Write-Warning 'adb could not list devices; the Android emulator was not stopped.'
    } else {
        $emulatorSerials = @(
            $deviceOutput | Select-Object -Skip 1 | ForEach-Object {
                if ($_ -match '^(emulator-\S+)\s+device(?:\s|$)') { $Matches[1] }
            }
        )

        $selectedEmulators = @()
        if ($env:ANDROID_SERIAL -and $emulatorSerials -contains $env:ANDROID_SERIAL) {
            $selectedEmulators = @($env:ANDROID_SERIAL)
        } elseif ($emulatorSerials.Count -eq 1) {
            $selectedEmulators = $emulatorSerials
        } elseif ($emulatorSerials.Count -gt 1) {
            Write-Warning 'Multiple Android emulators are running; set ANDROID_SERIAL to the emulator to stop. None were stopped.'
        }

        foreach ($serial in $selectedEmulators) {
            & $adb.Source -s $serial emu kill
            if ($LASTEXITCODE -eq 0) {
                Write-Output "Stopped Android emulator $serial."
            } else {
                Write-Warning "Could not stop Android emulator $serial."
            }
        }
    }
}

if (Test-Path -LiteralPath $composeFile) {
    $docker = Get-Command docker -ErrorAction SilentlyContinue
    if ($docker) {
        & $docker.Source compose -f $composeFile stop
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Docker Compose could not stop this app's services. They may still be running."
        }
    } else {
        Write-Warning "Docker is unavailable; this app's PostgreSQL and pgAdmin services were not stopped."
    }
}
