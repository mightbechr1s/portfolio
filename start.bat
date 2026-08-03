@echo off
cd /d "D:\Projects\VSCPROJ\portfolio"
echo Starting portfolio dev server at http://localhost:3002/portfolio
start http://localhost:3002/portfolio
call npm run dev
pause
