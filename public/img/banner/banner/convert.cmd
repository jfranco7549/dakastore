@echo off
for %%i in (*.png) do (
    ffmpeg -i "%%i" -c:v libwebp  "%%~ni.webp"
)