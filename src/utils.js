var _ = require('lodash');

/**
 * A module of common utilities
 * @namespace Utils
 * @type {Object}
 */
var Utils = module.exports = {};

/**
 * Copies an properties from one object to another overriding defaults
 * @param  {Object|function} input  The optional properties
 * @param  {Object} defaults        The default properties
 * @return {Object}                 An object with the optional properties overriding the default
 */
Utils.unwrap = function unwrap(input, defaults)
{
  if( typeof input === 'function' )
  {
    var clone = _.cloneDeep(defaults);
    input.apply(clone);
    return clone;
  }
  else if( typeof input === 'object' )
  {
    var clone = _.cloneDeep(defaults);
    _.merge(clone, input);
    return clone;
  }
  return defaults;
}
