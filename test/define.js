var assert = require('assert')
  , _ = require('lodash')
  , define = require('../src/define')
;

describe('ludwig#define', function(){

  var Cls1 = define(function(){
    this.constructor = function(a, b)
    {
      this._a = a;
      this._b = b;
    }
    this.get.a = function(){ return this._a; }
    this.set.a = function(val){ this._a = val; }
    this.get.b = function(){ return this._b; }
    this.set.b = function(val){ this._b = val; }
    this.method.add = function(){ return Cls1.addAll(this._a, this._b) }
    this.method.addMore = function(){ return false; }

    this.static.method.addAll = function()
    {
      var sum = 0;
      for(var i=0, ii=arguments.length; i<ii; i++)
      {
        sum += arguments[i];
      }
      return sum;
    }

    this.method.overrideMe = function(){};
    this.static.method.overrideMe = function(){};
  });

  var Cls2 = define(function(){
    this.extends = Cls1;

    this.constructor = function(a, b, c)
    {
      this.super.apply(this, arguments);
      this._c = c;
    }
    this.get.c = function(){ return this._c; }
    this.set.c = function(val){ this._c = val; }
    this.method.addMore = function(){ return Cls2.addAll(this.add(), this._c); }

    this.method.overrideMe = function(){ return this.super };
    this.static.method.overrideMe = function(){ return this.super };
  });

  it('subclass should be instance of extended class', function(){
    var i1 = new Cls1()
      , i2 = new Cls2()
    ;
    assert( i2 instanceof Cls1 );
  });

  it('method should be attached to instance', function(){
    var i1 = new Cls1(1, 2);
    assert( i1.add() == 3 );
  });

  it('method should be attached to subclass instance', function(){
    var i2 = new Cls2(1, 2, 3);
    assert( i2.add() == 3 );
  });

  it('getter should return value', function(){
    var i1 = new Cls1(1, 2);
    assert(i1.a == 1);
    assert(i1.b == 2);
  });

  it('setter should set value', function(){
    var i1 = new Cls1(0, 0);
    i1.a = 1;
    i1.b = 2;
    assert(i1.a == 1);
    assert(i1.b == 2);
  });

  it('instance methods should be overridable', function(){
    var i1 = new Cls1()
      , i2 = new Cls2()
    ;
    assert(i1.overrideMe != i2.overrideMe);
  });

  it('instance methods super should refer to extended class method', function(){
    var i1 = new Cls1()
      , i2 = new Cls2()
    ;
    assert(i2.overrideMe() == i1.overrideMe);
  });

  it('static methods should be extended', function(){
    assert(Cls1.addAll == Cls2.addAll);
  });

  it('static methods should be overridable', function(){
    assert(Cls1.overrideMe != Cls2.overrideMe)
  });

  it('static methods super should refer to extended class method', function(){
    assert( Cls2.overrideMe() == Cls1.overrideMe );
  });

});
