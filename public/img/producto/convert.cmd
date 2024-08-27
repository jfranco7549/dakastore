@echo off
for %%i in (*.jpg) do (
    ffmpeg -i "%%i" -c:v libwebp  "%%~ni.webp"
)