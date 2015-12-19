"use strict";

const AppDispatcher = require('../dispatcher/AppDispatcher'),
  EventEmitter = require('events').EventEmitter,
  AppConstants = require('../constants/AppConstants'),
  assign = require('object-assign'),
  ReprojectGeoJson = require('../geo/ReprojectGeoJson'),
  Utils = require('../core/Utils');

const CHANGE_EVENT = 'change';

// Reference to GeoJson objs
// Swap how this is stored at somepoint, version it, etc
// TODO fix: We always store both OSGB36 and WGS84 projections updating the
//  other upon change. Design this better.
//
let _osgb = {};
let _wgs84 = {};
let _inputCrs = AppConstants.CRS_LONLAT;

const emptyGeoJson = Utils.featureCollection([]),
  initialCrs = AppConstants.CRS_LONLAT;

function reproject(geoJson, requestedCrs) {
  if(requestedCrs === AppConstants.CRS_LONLAT) {
    return ReprojectGeoJson.toWGS84(geoJson);
  } else {
    return ReprojectGeoJson.toOSGB36(geoJson);
  }
}

/**
 * Write GeoJson data in the specified Reference System.
 */
function setData(geoJson, inputReferenceSystem) {
  if(inputReferenceSystem === AppConstants.CRS_LONLAT) {
    _wgs84 = geoJson;
    _osgb = reproject(geoJson, AppConstants.CRS_BNG);
    return;
  }

  if(inputReferenceSystem === AppConstants.CRS_BNG) {
    _osgb = geoJson;
    _wgs84 = reproject(geoJson, AppConstants.CRS_LONLAT);
    return;
  }
}

/**
 * Fetch GeoJson data in the specified Reference System.
 */
function getData(requestedCrs) {
  if(requestedCrs === AppConstants.CRS_LONLAT) {
    return _wgs84;
  }

  if(requestedCrs === AppConstants.CRS_BNG) {
    return _osgb;
  }
}

/**
 * Store the current input Reference System.
 */
function setInputCrs(inputReferenceSystem) {
  _inputCrs = inputReferenceSystem;
}

/**
 * Create a GeoJson item.
 */
function create(data, inputReferenceSystem) {
  setData(data, inputReferenceSystem);
}

/**
 * Update a GeoJson item.
 */
function update(data, inputReferenceSystem) {
  // TODO
}

/**
 * Reset all.
 */
function destroy() {
  _osgb = _wgs84 = emptyGeoJson;
}

const AppStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the GeoJson and Reference System.
   */
  getItem(requestedCrs) {
    if(!requestedCrs) {
      requestedCrs = _inputCrs;
    }

    return {
      geoJson: getData(requestedCrs),
      inputReferenceSystem: _inputCrs
    };
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(action => {
  let data, inputReferenceSystem;

  switch(action.actionType) {
    case AppConstants.GEOJSON_CREATE:
      data = action.data;
      inputReferenceSystem = action.inputReferenceSystem;
      if(!inputReferenceSystem) {
        inputReferenceSystem = _inputCrs;
      }
      if (data !== null) {
        create(data, inputReferenceSystem);
        AppStore.emitChange();
      }
      break;

    case AppConstants.GEOJSON_UPDATE:
      // todo
      break;

    case AppConstants.GEOJSON_DESTROY:
      destroy();
      AppStore.emitChange();
      break;

    case AppConstants.CRS_CHANGE:
      inputReferenceSystem = action.inputReferenceSystem;
      if(inputReferenceSystem) {
        setInputCrs(inputReferenceSystem);
        AppStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

create(emptyGeoJson, initialCrs);
setInputCrs(initialCrs);

module.exports = AppStore;
