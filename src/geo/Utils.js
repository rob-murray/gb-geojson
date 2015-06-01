module.exports = {
  featureCollection: function (features) {
    return {
        type: 'FeatureCollection',
        features: features
    };
  }
};
