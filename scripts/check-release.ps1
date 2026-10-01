[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Installer,

    [string]$Checksums,
    [string]$AssetName,
    [string]$ApplicationExe,
    [switch]$RequireSigned
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ($env:OS -ne 'Windows_NT') {
    throw 'Authenticode verification requires Windows.'
}
if ($RequireSigned -and [string]::IsNullOrWhiteSpace($ApplicationExe)) {
    throw '-RequireSigned requires -ApplicationExe to check both the application and installer.'
}
if (-not [string]::IsNullOrWhiteSpace($AssetName)) {
    if ([string]::IsNullOrWhiteSpace($Checksums)) {
        throw '-AssetName requires -Checksums.'
    }
    if ($AssetName -match '[\\/]' -or $AssetName -eq '.' -or $AssetName -eq '..') {
        throw '-AssetName must be a release asset filename, without a directory.'
    }
}

function Get-ReleaseFile {
    param([string]$Path)
    $item = Get-Item -LiteralPath $Path -ErrorAction Stop
    if ($item -isnot [System.IO.FileInfo]) {
        throw "Expected a file: $Path"
    }
    return $item
}

$installerFile = Get-ReleaseFile -Path $Installer
$expectedAssetName = $installerFile.Name
if (-not [string]::IsNullOrWhiteSpace($AssetName)) {
    $expectedAssetName = $AssetName
}
$installerHash = (Get-FileHash -LiteralPath $installerFile.FullName -Algorithm SHA256).Hash
Write-Host ("Installer: {0}" -f $installerFile.FullName)
Write-Host ("SHA-256: {0}" -f $installerHash.ToLowerInvariant())

if (-not [string]::IsNullOrWhiteSpace($Checksums)) {
    Write-Host ("Release asset name: {0}" -f $expectedAssetName)
    $checksumFile = Get-ReleaseFile -Path $Checksums
    $matchingEntries = @()
    foreach ($line in Get-Content -LiteralPath $checksumFile.FullName -Encoding UTF8) {
        if ([string]::IsNullOrWhiteSpace($line)) {
            continue
        }
        if ($line -notmatch '^(?<hash>[A-Fa-f0-9]{64})[ \t]+\*?(?<name>.+)$') {
            throw 'Invalid SHA256SUMS line; expected a SHA-256 hash and asset filename.'
        }
        if ([string]::Equals($Matches['name'], $expectedAssetName, [StringComparison]::Ordinal)) {
            $matchingEntries += $Matches['hash']
        }
    }
    if ($matchingEntries.Count -ne 1) {
        throw ("SHA256SUMS must contain exactly one entry named {0}; found {1}. Use -AssetName only when the browser renamed the download." -f $expectedAssetName, $matchingEntries.Count)
    }
    if (-not [string]::Equals($matchingEntries[0], $installerHash, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Installer SHA-256 does not match SHA256SUMS.'
    }
    Write-Host 'Checksum: MATCH'
} else {
    Write-Host 'Checksum: not compared (no -Checksums supplied).'
}

$files = @($installerFile)
if (-not [string]::IsNullOrWhiteSpace($ApplicationExe)) {
    $applicationFile = Get-ReleaseFile -Path $ApplicationExe
    if ([string]::Equals($applicationFile.FullName, $installerFile.FullName, [StringComparison]::OrdinalIgnoreCase)) {
        throw '-ApplicationExe must be a different file from the installer.'
    }
    $files += $applicationFile
}

$signatureFailures = @()
foreach ($file in $files) {
    $signature = Get-AuthenticodeSignature -LiteralPath $file.FullName -ErrorAction Stop
    $hasTimestamp = $null -ne $signature.TimeStamperCertificate
    Write-Host ("Signature: {0} => {1}; timestamp certificate: {2}" -f $file.Name, $signature.Status, $hasTimestamp)
    if ($RequireSigned -and ($signature.Status -ne 'Valid' -or -not $hasTimestamp)) {
        $signatureFailures += $file.Name
    }
}
if ($signatureFailures.Count -gt 0) {
    throw ("Valid Authenticode signatures with timestamps are required: {0}" -f ($signatureFailures -join ', '))
}

if ($RequireSigned) {
    Write-Host 'Release signature gate: PASSED for both supplied files.'
} else {
    Write-Host 'Read-only check completed. Signature status is informational; use -RequireSigned for the signed-release gate.'
}
