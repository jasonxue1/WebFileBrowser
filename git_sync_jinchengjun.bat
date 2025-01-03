@echo off

git pull origin jinchengjun

git add .

git commit -m "committed by git_sync.bat"

git push origin jinchengjun

echo Git sync complete!
pause