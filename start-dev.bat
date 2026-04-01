@echo off
REM Start dev server with increased memory and Node.js flags to avoid V8 crashes
set NODE_OPTIONS=--max-old-space-size=4096 --no-concurrent-sweeping
cd /d "%~dp0"
node --max-old-space-size=4096 --no-concurrent-sweeping node_modules\.bin\next dev --no-turbopack
