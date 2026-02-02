# lolite-browser
LoLite for browsers.

## Usage
```html
<script src="https://unpkg.com/lolite-browser"></script>
<script>
  console.log(lolite.add(1, 2)) // 3
</script>
```
You can also use `lolite-browser` as a one-dependency replacement for the normal `lolite` package instead (note: this may not work, node.js support in lolite-browser is in beta):
```js
const lolite = require("lolite-browser")
```

## Documentation
See the documentation in [LoLite's readme](https://npmjs.com/lolite)