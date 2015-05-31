var gbifygeoson = require("gbify-geojson");

module.exports = {
  toOSGB36: function(geoJson) {
    return gbifygeoson.toOSGB36(geoJson);
  },

  toWGS84: function(geoJson) {
    return gbifygeoson.toWGS84(geoJson);
  }
}
