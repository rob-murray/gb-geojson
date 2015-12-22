"use strict";

const React = require('react'),
  OSMap = require('./OSMap.jsx'),
  MenuPanel = require('./MenuPanel.jsx'),
  ManualEditPanel = require('./ManualEditPanel.jsx'),
  GeoStore = require('../stores/GeoStore'),
  AppConstants = require('../constants/AppConstants');

function getState() {
  return {
    item: GeoStore.getItem()
  };
}

const App = React.createClass({
  getInitialState() {
    return getState();
  },

  componentDidMount() {
    GeoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    GeoStore.removeChangeListener(this._onChange);
  },

  render() {
    const geoJson = this.state.item.geoJson,
      inputReferenceSystem = this.state.item.inputReferenceSystem,
      geoJsonForMapView = this._geoJsonForMapView();
      // TODO we need the wgs84 version for the map. design this better

    return (
      <div>
        <OSMap geoJson={geoJsonForMapView} inputReferenceSystem={inputReferenceSystem} />
        <MenuPanel>
          <ManualEditPanel geoJson={geoJson} inputReferenceSystem={inputReferenceSystem} />
        </MenuPanel>
      </div>
    );
  },

  _geoJsonForMapView() {
    return GeoStore.getItem(AppConstants.CRS_LONLAT).geoJson;
  },

  /**
   * Event handler for 'change' events coming from the GeoStore
   */
  _onChange() {
    this.setState(getState());
  }
});

module.exports = App;
