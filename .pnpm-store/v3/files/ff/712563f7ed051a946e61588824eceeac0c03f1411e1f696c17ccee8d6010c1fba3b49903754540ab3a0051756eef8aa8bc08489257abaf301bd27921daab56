pushd %~dp0
del /f /q dist\demo.js
del /f /q dist\demo.js.map
call npm run dist
call tsc demo.ts --sourcemap
node demo.js
popd
