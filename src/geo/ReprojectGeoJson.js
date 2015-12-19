"use strict";

const gbify = require("gbify-geojson");

module.exports = {
  toOSGB36(geoJson) {
    return gbify.toOSGB36(geoJson);
  },

  toWGS84(geoJson) {
    return gbify.toWGS84(geoJson);
  }
};
