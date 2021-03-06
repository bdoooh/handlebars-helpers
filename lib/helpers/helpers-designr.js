/**
 * Handlebars Helpers: Misc. Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// The module to be exported
var helpers = {

  /**
   * {{ifEnoughPagesWithProperty}}
   * Checks to see if there are enough pages with a specific property provided
   * to proceed with a given content block
   * @author: Cody Richmond <http://github.com/gdvsbp>
   *
   * @param  {object} dataSet [the object being looked in]
   * @param  {integer} min [minimum number needed to be considered successful]
   * @param  {string} propertyName [the name of the property we're checking the value of]
   * @param {string} desiredPropertyValue   [the value we wish for the above property to have]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{#ifEnoughPagesWithProperty dataSet 3 "propertyName" "desiredPropertyValue"}}
   */
  ifEnoughPagesWithProperty: function ( dataSet, min, propertyName, desiredPropertyValue, options ) {
    for( var page in dataSet ) {
      if( dataSet[ page ].data[ propertyName ] === desiredPropertyValue ) {
        if( --min === 0 ) {
          return options.fn(this);
        }
      }
    }

    return options.inverse(this);
  },

  /**
   * {{urlparsecloudinary}}
   * Returns the last 2 items in a cloudinary URL string
   * @example: {{#urlparsecloudinary url}}
   */
  urlparsecloudinary: function( url ) {
    var urlParseArray = url.split( "/" ),
      returner = [], pop;

    while( true ) {
      pop = urlParseArray.pop();
      if( pop.match( /^(v\d*)|(upload)|([^_]+_[^_,]+[,]?)+$/ ) ) {
        break;
      }
      returner.unshift( pop );
    }
    return returner.join("/");
  },

  allUniqueHeroImages: function (context, options) {
    var fn = options.fn;
    var inverse = options.inverse;
    var i = 0;
    var ret = "";
    var data = void 0;
    var images = [], heroImage;

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }
    if (context && typeof context === 'object') {
      for (var key in context) {
        if (context.hasOwnProperty(key)) {
          heroImage = ( !!context[ key ].data ? context[ key ].data.heroImage : null );

          if( !!heroImage ) {
            if( images.indexOf( heroImage ) === -1 ) {
              images.push( heroImage );

              if (data) {data.key = key;}
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }

        }
      }
    }
    if (i === 0) {ret = inverse(this);}
    return ret;
  }


};

// Export helpers
module.exports.register = function (Handlebars, options) {
  options = options || {};

  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};
