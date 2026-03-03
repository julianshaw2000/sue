$sourceDir = "C:\__Sue\backup-12.13.2024_15-37-14_coaching4all"
$destinationDir = "C:\__Sue\images"

Get-ChildItem -Path $sourceDir -Recurse | Where-Object { $_.Extension -match "pdf" } | ForEach-Object {
    $destinationPath = Join-Path -Path $destinationDir -ChildPath $_.Name
    Move-Item -Path $_.FullName -Destination $destinationPath -Force
}
