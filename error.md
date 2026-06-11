## Error Type
Build Error

## Error Message
Failed to compile

## Build Output
./src/app/about/partners/page.tsx
Error: 

Caused by:
    0: Failed to read source code from D:\Kashmir Environmental Intelligence Platform\src\app\about\partners\page.tsx
    1: stream did not contain valid UTF-8

Next.js version: 16.2.2 (Webpack)

## Fix
File was saved as Windows-1252 by PowerShell `Set-Content` during `max-w-2xl` → `max-w-xl` batch replacement.
Byte 0x97 (em dash in Windows-1252) appeared 16 times — invalid standalone byte in UTF-8.
Re-encoded file as UTF-8 via `[System.IO.File]::WriteAllText()` after reading as codepage 1252.
