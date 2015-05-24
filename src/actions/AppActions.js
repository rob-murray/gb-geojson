var AppDispatcher = require('../dispatcher/AppDispatcher'),
  AppConstants = require('../constants/AppConstants');

var AppActions = {
  /**
   * Create new GeoJSON object.
   *
   * @param  {object} data The GeoJSON data object
   * @param  {const} inputCrs The reference system used
   */
  create: function(data, inputCrs) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GEOJSON_CREATE,
      data: data,
      inputCrs: inputCrs
    });
  },

  /**
   * NOT USED :\
   * @param  {object} data
   */
  update: function(data, inputCrs) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GEOJSON_UPDATE,
      data: data,
      inputCrs: inputCrs
    });
  },

  /**
   * Clear GeoJSON
   */
  destroy: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GEOJSON_DESTROY
    });
  },

  /**
   * Coordinate reference sytem of data has changed
   * @param {const} The CRS changed to
   */
  referenceSystemChanged: function(inputCrs) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CRS_CHANGE,
      inputCrs: inputCrs
    });
  }
};

module.exports = AppActions;
