# lolite.__private.crash

### `crash.js`
An internal function that crashes the program. This is used internally in code for cases that should never happen. If LoLite crashes, it is a serious bug and your Node.js could be broken, or the world could be ending.
```javascript
const crash_program = require("lolite").__private.crash
crash_program()
/* The above code will output something like this:

[lolite] SOMETHING WENT WRONG, PORGAM IS ABOUT TO CRASH, A CRASH DUMP FILE WILL PROBABLY BE GENERATED
~ PLEASE FILE ISSUE ON GITHUB REPO:
https://github.com/enterprise-npm-ai/lolite.
Porgam crahed.
*/
```
It will also create a crash dump file with a filename like `crash_3989.bin` in your root project directory, with some stack dump information.
Note: you can also require `lolite/test/crash` and it will immediately crash the program, like this:
```javascript
require("lolite/test/crash") // crashes program
```