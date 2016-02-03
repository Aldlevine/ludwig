# ludwig

A module that adds a classy syntax to javascript

Install:
```bash
npm i -S ludwig
```

Example:
```javascript
var ludwig = require('ludwig');

var Adder = ludwig.define(function(){
  this.constructor = function Adder(a, b)
  {
    this._a = a;
    this._b = b;
  }

  this.method.add = function() { return this._a + this._b; }

  this.get.a = function() { return this._a; }

  this.get.b = function() { return this._b; }

  this.set.a = function(val) { this._a = val; }

  this.set.b = function(val) { this._b = val; }
});

var SubAdder = ludwig.define(function(){
  this.extends = Adder;

  this.constructor = function(a, b, c)
  {
    this.super.call(this, a, b);
    this._c = c;
  }

  this.method.add = function() { return this.super() + this._c; }

  this.get.c = function() { return this._c; }

  this.set.c = function(val) { this._c = val; }
});

var subAdderInstance = new SubAdder(1, 2, 3);
subAdderInstance instanceof Adder; //true
subAdder.a;// 1
subAdder.b;// 2
subAdder.c;// 3
subAdder.add();// 6
```

* * *


# ludwig.define

Generates a class based on input input function


### define(fn)

Generates a class based on input input function

**Parameters**

**fn**: `function`, The class definition

**Returns**: `function`, The class constructor


### define.__extend(con, ext)

Extends a class with another

**Parameters**

**con**: `function`, The class that is extending

**ext**: `function`, The class to be extended

**Returns**: `function`, A subclass of the extended class


### define._addSuper(con)

Creates a definition to super on the class

**Parameters**

**con**: `function`, The class to add the reference to super to



### define._addSuperStatic(con)

Same as __addSuper, but alters the static class instead

**Parameters**

**con**: `function`, The class to add the reference to super to



### define._addGetter(obj, name, fn)

Adds a property getter to an object

**Parameters**

**obj**: `Object`, The object to add the getter to

**name**: `string`, The name of the getter

**fn**: `function`, The getter function



### define._addSetter(obj, name, fn)

Adds a property setter to an object

**Parameters**

**obj**: `Object`, The object to add the setter to

**name**: `string`, The name of the setter

**fn**: `function`, The setter function



### define._addProperties(con, definition)

Adds a list of properties to a class

**Parameters**

**con**: `function`, The class to add the properties to

**definition**: `Object`, The class definition object



### define._addMethod(obj, name, fn)

Adds a method to an object

**Parameters**

**obj**: `Object`, The object to add the method to

**name**: `string`, The name of the method

**fn**: `function`, The method itself



### define._addMethods(con, definition)

Adds a list of methods to a class

**Parameters**

**con**: `function`, The class to add the methods to

**definition**: `Object`, The class definition object



### define._addStatic(con, defStatic)

Adds static members to the class

**Parameters**

**con**: `function`, The class to add the static members to

**defStatic**: `Object`, The static definition object isolated from the class definition object




* * *


# ludwig.utils

A module of common utilities



### utils.unwrap(input, defaults)

Copies an properties from one object to another overriding defaults

**Parameters**

**input**: `Object | function`, The optional properties

**defaults**: `Object`, The default properties

**Returns**: `Object`, An object with the optional properties overriding the default



* * *
