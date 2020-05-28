'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var isFunction = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ?
    function isFunction(fn) {
        return typeof fn === 'function';
    } :
    function isFunction(fn) {
        return toString.call(fn) === '[object Function]';
    };

module.exports = function forEach(obj, fn, ctx) {
    if (!isFunction(fn)) {
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
