"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

export default {
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
