@echo off
setlocal enabledelayedexpansion


for %%f in (*.webp) do (
 
    set "filename=%%~nf"
    set "first11=!filename:~0,11!"

    if not "!filename!"=="!first11!" (
        del "%%f"
    )
)

endlocal
