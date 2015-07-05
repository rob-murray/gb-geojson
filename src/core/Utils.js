"use strict";

module.exports = {
  featureCollection: function (features) {
    return {
        type: 'FeatureCollection',
        features: features
    };
  },

  errorsToSentence: function (errors) {
    if (errors instanceof Error) {
      return errors.toString();
    }

    return errors.map(function(err){
      return err.message;
    }).join(', ');
  }
};
