# Fix Next.js dev server lock issue
Write-Host "Stopping all Node processes..." -ForegroundColor Yellow
try { Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force } catch {}

Write-Host "Cleaning lock files..." -ForegroundColor Yellow
Remove-Item -Path ".next\dev\lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".next\dev" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Starting dev server..." -ForegroundColor Green
pnpm dev
