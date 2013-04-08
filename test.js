var test = require('tape');
var forEach = require('./index.js');

test('first argument: iterable', function (t) {
  t.throws(function () { forEach(); }, TypeError, 'undefined is not iterable');
  t.throws(function () { forEach(null); }, TypeError, 'null is not iterable');
  t.throws(function () { forEach(''); }, TypeError, 'string is not iterable');
  t.throws(function () { forEach(true); }, TypeError, 'true is not iterable');
  t.throws(function () { forEach(false); }, TypeError, 'false is not iterable');
  t.throws(function () { forEach(NaN); }, TypeError, 'NaN is not iterable');
  t.throws(function () { forEach(42); }, TypeError, '42 is not iterable');
  t.doesNotThrow(function () { forEach([]); }, TypeError, 'array is iterable');
  t.doesNotThrow(function () { forEach({}); }, TypeError, 'object is iterable');
  t.doesNotThrow(function () { forEach(new Date()); }, TypeError, 'object subtype is iterable');
  t.end();
});

test('array', function (t) {
  var arr = [1, 2, 3];

  t.test('iterates over every item', function (st) {
    var index = 0;
    forEach(arr, function () { index += 1; });
    st.equal(index, arr.length, 'iterates ' + arr.length + ' times');
    st.end();
  });

  t.test('first iterator argument', function (st) {
    var index = 0;
    st.plan(arr.length);
    forEach(arr, function (item) {
      st.equal(arr[index], item, 'item ' + index + ' is passed as first argument');
      index += 1;
    });
  });

  t.test('second iterator argument', function (st) {
    var counter = 0;
    st.plan(arr.length);
    forEach(arr, function (item, index) {
      st.equal(counter, index, 'index ' + index + ' is passed as second argument');
      counter += 1;
    });
  });

  t.test('third iterator argument', function (st) {
    st.plan(arr.length);
    forEach(arr, function (item, index, array) {
      st.deepEqual(arr, array, 'array is passed as third argument');
    });
  });

  t.test('context argument', function (st) {
    var context = {};
    forEach([], function () {
      st.equal(this, context, '"this" is the passed context');
    }, context);
    st.end();
  });

  t.end();
});

test('object', function (t) {
  var obj = {
    a: 1,
    b: 2,
    c: 3
  };
  var keys = ['a', 'b', 'c'];

  var F = function () {
    this.a = 1;
    this.b = 2;
  };
  F.prototype.c = 3;
  var fKeys = ['a', 'b'];

  t.test('iterates over every object literal key', function (st) {
    var counter = 0;
    forEach(obj, function () { counter += 1; });
    st.equal(counter, keys.length, 'iterated ' + counter + ' times');
    st.end();
  });

  t.test('iterates only over own keys', function (st) {
    var counter = 0;
    forEach(new F(), function () { counter += 1; });
    st.equal(counter, fKeys.length, 'iterated ' + fKeys.length + ' times');
    st.end();
  });

  t.test('first iterator argument', function (st) {
    var index = 0;
    st.plan(keys.length);
    forEach(obj, function (item) {
      st.equal(obj[keys[index]], item, 'item at key ' + keys[index] + ' is passed as first argument');
      index += 1;
    });
  });

  t.test('second iterator argument', function (st) {
    var counter = 0;
    st.plan(keys.length);
    forEach(obj, function (item, key) {
      st.equal(keys[counter], key, 'key ' + key + ' is passed as second argument');
      counter += 1;
    });
  });

  t.test('third iterator argument', function (st) {
    st.plan(keys.length);
    forEach(obj, function (item, key, object) {
      st.deepEqual(obj, object, 'object is passed as third argument');
    });
  });

  t.test('context argument', function (st) {
    var context = {};
    forEach({}, function () {
      st.equal(this, context, '"this" is the passed context');
    }, context);
    st.end();
  });

  t.end();
});

