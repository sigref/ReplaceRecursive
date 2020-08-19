# ReplaceRecursive
Replace contents recursive.

# Usage
```javascript
const replace = require('./dist/ReplaceRecursive');
const test = ['a', 'b', {a: 'a', b: 'b'}];
const from = 'a';
const to = 'c';

replace(test, from, to);
// => returns ['c', 'b', {a: 'c', b: 'b'}];
```