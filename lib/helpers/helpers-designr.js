/**
 * Handlebars Helpers: Misc. Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';


// The module to be exported
var helpers = {

  /**
   * {{ifHasEnoughServices}}
   * Checks to see if there are enough services provided to show services blocks
   * @author: Cody Richmond <http://github.com/gdvsbp>
   *
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   *
   * @example: {{ifSome this compare=that}}
   */
  ifHasEnoughServices: function () {
    var argLength = arguments.length - 1,
      content = arguments[argLength],
      minServices = arguments[ 1 ],
      pageData = arguments[ 0 ],
      success = false,
      page;

    for( page in pageData ) {
      if( pageData[ page ].data.services === "1" ) {
        if( --minServices === 0 ) {
          return content.fn(this);
        }
      }
    }

    return content.inverse(this);
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
