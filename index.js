
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (typeof obj !== 'object' || obj === null) {
        throw new TypeError('can only iterate over objects or arrays');
    }
    if (toStr.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

