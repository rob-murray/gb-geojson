"use strict";

module.exports = {
  featureCollection(features) {
    return {
        type: 'FeatureCollection',
        features: features
    };
  },

  errorsToSentence(errors) {
    if (errors instanceof Error) {
      return errors.toString();
    }

    return errors.map(err => {
      return err.message;
    }).join(', ');
  }
};
