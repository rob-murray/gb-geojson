"use strict";

const AppDispatcher = require('../dispatcher/AppDispatcher'),
  AppConstants = require('../constants/AppConstants');

const AppActions = {
  /**
   * Create new GeoJSON object.
   *
   * @param  {object} data The GeoJSON data object
   * @param  {const} inputReferenceSystem The reference system used
   */
  create(data, inputReferenceSystem) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GEOJSON_CREATE,
      data: data,
      inputReferenceSystem: inputReferenceSystem
    });
  },

  /**
   * NOT USED :\
   * @param  {object} data
   */
  update(data, inputReferenceSystem) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GEOJSON_UPDATE,
      data: data,
      inputReferenceSystem: inputReferenceSystem
    });
  },

  /**
   * Clear GeoJSON
   */
  destroy() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GEOJSON_DESTROY
    });
  },

  /**
   * Coordinate reference sytem of data has changed
   * @param {const} The CRS changed to
   */
  referenceSystemChanged(inputReferenceSystem) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CRS_CHANGE,
      inputReferenceSystem: inputReferenceSystem
    });
  }
};

module.exports = AppActions;
