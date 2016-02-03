var Utils = require('./utils')


/**
 * Generates a class based on input input function
 * @module define
 */

/**
 * @function
 * @param {Function} fn The class definition
 * @returns {Function}  The class constructor
 */
var Define = module.exports = function Define(fn)
{
  var definition = {
      constructor: null,
      extends: null,
      get: {},
      set: {},
      method: {},
      static: {
        get: {},
        set: {},
        method: {},
        property: {}
      }
    }
    , con = null
  ;

  definition = Utils.unwrap(fn, definition);
  con = definition.constructor;
  con._methodName = 'constructor';

  if( definition.extends )
  {
    Define._extend(definition.constructor, definition.extends);
  }

  Define._addProperties(con, definition);
  Define._addMethods(con, definition);
  Define._addStatic(con, definition.static);

  con._definition = definition;

  return con;
};


/**
 * Extends a class with another
 * @method Define.__extend
 * @param  {Function} con - The class that is extending
 * @param  {Function} ext - The class to be extended
 * @returns {Function}     A subclass of the extended class
 */
Define._extend = function _extend(con, ext)
{
  con.prototype = Object.create(ext.prototype);
  con.prototype.constructor = con;
  Define._addSuper(con);
  Define._addSuperStatic(con);

  con._super = ext;
  var sup = con;
  while(sup = sup._super)
  {
    Define._addStatic(con, sup._definition.static);
  }
};


/**
 * Creates a definition to super on the class
 * @function
 * @param {Function} con The class to add the reference to super to
 */
Define._addSuper = function _addSuper(con)
{
  Object.defineProperty(con.prototype, 'super', {
    get: function get()
    {
      var impl = get.caller
        , name = impl._methodName
        , foundImpl = this[name] == impl
        , proto = this
      ;
      while( proto = Object.getPrototypeOf(proto) )
      {
        if( !proto[name] )
        {
          break;
        }
        if( proto[name] == impl )
        {
          foundImpl = true;
        }
        else if( foundImpl )
        {
          return proto[name];
        }
      }
    }
  });
}


/**
 * Same as {@link __addSuper}, but alters the static class instead
 * @function
 * @param {Function} con The class to add the reference to super to
 */
Define._addSuperStatic = function _addSuperStatic(con)
{
  Object.defineProperty(con, 'super', {
    get: function get()
    {
      var impl = get.caller
        , name = impl._methodName
        , foundImpl = this[name] == impl
        , obj = this
      ;
      while( obj = obj._super )
      {
        if( !obj[name] )
        {
          break;
        }
        if( obj[name] == impl )
        {
          foundImpl = true;
        }
        else if( foundImpl )
        {
          return obj[name];
        }
      }
    }
  });
}


/**
 * Adds a property getter to an object
 * @function
 * @param {Object}   obj  The object to add the getter to
 * @param {string}   name The name of the getter
 * @param {Function} fn   The getter function
 */
Define._addGetter = function _addGetter(obj, name, fn)
{
  Object.defineProperty(obj, name, {
    get: fn,
    configurable: true
  });
};


/**
 * Adds a property setter to an object
 * @function
 * @param {Object}   obj  The object to add the setter to
 * @param {string}   name The name of the setter
 * @param {Function} fn   The setter function
 */
Define._addSetter = function _addSetter(obj, name, fn)
{
  Object.defineProperty(obj, name, {
    set: fn,
    configurable: true
  });
};


/**
 * Adds a list of properties to a class
 * @function
 * @param {Function} con        The class to add the properties to
 * @param {Object} definition   The class definition object
 */
Define._addProperties = function _addProperties(con, definition)
{
  var definition = definition || {}
  ;
  for(var name in definition.get)
  {
    Define._addGetter(con.prototype, name, definition.get[name]);
  }
  for(var name in definition.set)
  {
    Define._addSetter(con.prototype, name, definition.set[name]);
  }
};



/**
 * Adds a method to an object
 * @function
 * @param {Object}   obj  The object to add the method to
 * @param {string}   name The name of the method
 * @param {Function} fn   The method itself
 */
Define._addMethod = function _addMethod(obj, name, fn)
{
  obj[name] = fn;
  fn._methodName = name;
}


/**
 * Adds a list of methods to a class
 * @function
 * @param {Function} con      The class to add the methods to
 * @param {Object} definition The class definition object
 */
Define._addMethods = function _addMethods(con, definition)
{
  for(var name in definition.method)
  {
    Define._addMethod(con.prototype, name, definition.method[name]);
  }
}


/**
 * Adds static members to the class
 * @function
 * @param {Function} con     The class to add the static members to
 * @param {Object} defStatic The static definition object isolated from the class definition object
 */
Define._addStatic = function _addStatic(con, defStatic)
{
  for( var name in defStatic.get )
  {
    Define._addGetter(con, defStatic.get[name]);
  }
  for( var name in defStatic.set )
  {
    Define._addSetter(con, defStatic.set[name]);
  }
  for( var name in defStatic.method )
  {
    Define._addMethod(con, name, defStatic.method[name]);
  }
  for( var name in defStatic.property )
  {
    con[name] = defStatic.property[name];
  }
}
