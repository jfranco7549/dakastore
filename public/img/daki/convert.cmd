@echo off
for %%i in (*.png) do (
    ffmpeg -i "%%i" -c:v libwebp  -lossless 1  "%%~ni.webp"
)