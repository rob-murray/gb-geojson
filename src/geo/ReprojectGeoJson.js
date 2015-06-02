"use strict";

var gbify = require("gbify-geojson");

module.exports = {
  toOSGB36: function(geoJson) {
    return gbify.toOSGB36(geoJson);
  },

  toWGS84: function(geoJson) {
    return gbify.toWGS84(geoJson);
  }
};
