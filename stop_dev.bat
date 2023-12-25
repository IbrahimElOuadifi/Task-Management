@echo off
SET SERVER_PORT=3000
SET CLIENT_PORT=3001

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr /R /C:":%SERVER_PORT% " /C:":%CLIENT_PORT% "') DO (
    SET /A ProcessId=%%P
    taskkill /PID %%P /F
)

timeout /t 5