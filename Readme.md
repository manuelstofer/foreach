
# foreach

Iterate over the key value pairs of either an array-like object or a dictionary like object.

[![browser support][1]][2]

## API

### foreach(object, function, [context])

```js
var each = require('foreach');

each([1,2,3], function (value, key, array) {
    // value === 1, 2, 3
    // key === 0, 1, 2
    // array === [1, 2, 3]
});

each({0:1,1:2,2:3}, function (value, key, object) {
    // value === 1, 2, 3
    // key === 0, 1, 2
    // object === {0:1,1:2,2:3}
});

// break & continue
each([1,2,3], function (value, key, array) {
    if (1 === value) {
        // continue loop
        return true;
    }

    if (2 === value) {
        // break loop
        return false;
    }
});
```

[1]: https://ci.testling.com/manuelstofer/foreach.png
[2]: https://ci.testling.com/manuelstofer/foreach

