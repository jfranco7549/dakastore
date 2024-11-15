@echo off
for %%i in (*.jpg) do (
    ffmpeg -y -i "%%i" -c:v libwebp  "%%~ni.webp"
)