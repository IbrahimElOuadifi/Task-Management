@echo off
cd server
start npm run watch
start npm run dev
cd ..

cd client
start npm run dev
cd ..