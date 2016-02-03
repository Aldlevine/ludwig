var assert = require('assert')
  , _ = require('lodash')
  , utils = require('../src/utils')
;

describe('utils#unwrap', function(){
  var defaults = {
    a: 1,
    b: 'a',
    c: {x: 'x', y: 'y'},
    dontChange: 100,
    dontChange2: {dc1: 'good', dc2: 'good'}
  };
  var optionsObj = {
    a: 11,
    b: 'aa',
    c: {x: 'xx', z: 'zz'}
  };
  var optionsFn = function(){
    this.a = 11;
    this.b = 'aa';
    this.c.x = 'xx';
    this.c.z = 'zz';
  };
  var expected = {
    a: 11,
    b: 'aa',
    c: {x: 'xx', y: 'y', z: 'zz'},
    dontChange: 100,
    dontChange2: {dc1: 'good', dc2: 'good'}
  };

  it('should copy defaults onto object', function(){
    assert(_.isEqual(utils.unwrap(optionsObj, defaults), expected));
  });

  it('should overwrite defaults with function', function(){
    assert(_.isEqual(utils.unwrap(optionsFn, defaults), expected));
  });

  it('should not mutate original defaults with function', function(){
    assert(utils.unwrap(optionsFn, defaults) != defaults);
  });

  it('should not mutate options object with defaults', function(){
    assert(utils.unwrap(optionsObj, defaults) != optionsObj);
  });
});
