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
