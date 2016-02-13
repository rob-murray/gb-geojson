"use strict";

import gbify from "gbify-geojson";

export default {
  toOSGB36(geoJson) {
    return gbify.toOSGB36(geoJson);
  },

  toWGS84(geoJson) {
    return gbify.toWGS84(geoJson);
  }
};
