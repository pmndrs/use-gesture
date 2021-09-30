@echo off
del /q/f *.asm
del /q/f *.cfg
rem node_0.12.4_x86.exe --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions  --redirect-code-traces --redirect-code-traces-to=code.asm --print_deopt_stress _build/demo.js
rem node --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions  --redirect-code-traces --redirect-code-traces-to=code.asm --print_deopt_stress _build/demo.js
node demo.js
rem 
rem iojs  --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces --print_deopt_stress --redirect-code-traces --redirect-code-traces-to=code.asm _build/demo.js 
rem "C:\Users\Igor\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --no-sandbox --js-flags="--trace-hydrogen --trace-phase=Z --trace-deopt --trace-inlining --trace-bce --trace-opt --trace_opt_verbose --print_deopt_stress --trace_array_abuse --trace-codegen --code-comments --hydrogen-track-positions --redirect-code-traces --emit-opt-code-positions --print-opt-code" "http://localhost:63343/ImageQuantization/demo/html/index.html"
rem "C:\Users\Igor\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --no-sandbox --js-flags="--trace-hydrogen --trace-phase=Z --trace-deopt --trace-inlining --print_deopt_stress --code-comments --hydrogen-track-positions --redirect-code-traces --emit-opt-code-positions --print-opt-code" "http://localhost:63343/ImageQuantization/demo/html/index.html"
rem jx_win32v8\jx --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --redirect-code-traces --redirect-code-traces-to=code.asm --print_deopt_stress _build/demo.js

rem jx_win32v8\jx _build/demo.js
rem echo === JX V8 ===
rem jx_win32v8\jx _build/demo.js

rem echo === JX SM ===
rem jx_win32sm\jx _build/demo.js

rem echo === iojs 2.1.1 nightly x64 ===
rem iojs_2.1.1n_x64.exe _build/demo.js

rem echo === iojs 2.1.1 nightly x32 === 
rem iojs_2.1.1n_x86.exe _build/demo.js

rem echo === Node.js 0.12.4 x64 === 
rem node_0.12.4_x64.exe _build/demo.js

rem echo === Node.js 0.12.4 x32 === 
rem node_0.12.4_x86.exe _build/demo.js