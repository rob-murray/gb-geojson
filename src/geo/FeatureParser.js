"use strict";

function parseFeature(feature) {
  return {
    properties: feature.properties,
    type: feature.geometry.type
  };
}

function anyFeatures(geoJson) {
  return (geoJson.features && geoJson.features.length);
}

function validGeoJson(geoJson) {
  return (geoJson && geoJson.geometry);
}

function parseGeoJson(geoJson) {
  if (!validGeoJson(geoJson) && !anyFeatures(geoJson)) {
    return [];
  } else {
    if (geoJson.type === "Feature") {
      return [parseFeature(geoJson)];
    }else{
      return geoJson.features.map(parseFeature);
    }
  }
}

export default {
  features: parseGeoJson
};
