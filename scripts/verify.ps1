[CmdletBinding()]
param([switch]$Bundle)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Invoke-Checked {
    param([string]$FilePath, [string[]]$Arguments)
    Write-Host ("> {0} {1}" -f $FilePath, ($Arguments -join ' '))
    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw ("Command failed ({0}): {1}" -f $LASTEXITCODE, $FilePath)
    }
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$pnpmCommand = (Get-Command pnpm -CommandType Application -ErrorAction Stop).Source
$cargoCommand = (Get-Command cargo -CommandType Application -ErrorAction Stop).Source

Push-Location -LiteralPath $projectRoot
try {
    Invoke-Checked -FilePath $pnpmCommand -Arguments @('install', '--frozen-lockfile')
    Invoke-Checked -FilePath $pnpmCommand -Arguments @('test')
    Invoke-Checked -FilePath $pnpmCommand -Arguments @('build')
    Invoke-Checked -FilePath $cargoCommand -Arguments @('fmt', '--manifest-path', 'src-tauri/Cargo.toml', '--all', '--', '--check')
    Invoke-Checked -FilePath $cargoCommand -Arguments @('test', '--locked', '--manifest-path', 'src-tauri/Cargo.toml')
    Invoke-Checked -FilePath $cargoCommand -Arguments @('clippy', '--locked', '--manifest-path', 'src-tauri/Cargo.toml', '--all-targets', '--', '-D', 'warnings')
    if ($Bundle) {
        Invoke-Checked -FilePath $pnpmCommand -Arguments @('exec', 'tauri', 'build', '--bundles', 'nsis')
    }
    Write-Host 'Verification passed. Windows desktop interactions require docs/WINDOWS_TEST.md.'
} finally {
    Pop-Location
}
