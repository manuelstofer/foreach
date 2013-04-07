
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forEach(obj, fn, ctx) {
    if (obj == null) return;
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj,k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

