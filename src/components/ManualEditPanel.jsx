"use strict";

const JsonEditInput = require('./JsonEditInput.jsx'),
  FeatureList = require('./FeatureList.jsx'),
  AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants'),
  React = require('react');

const CRS_LINK = 'https://github.com/rob-murray/gb-geojson#what-is-the-difference-between-lon-lat-and-os-national-grid';

const ManualEditPanel = React.createClass({
  getDefaultProps() {
    return {
      inputReferenceSystem: AppConstants.CRS_LONLAT
    };
  },

  onFormatChange(e) {
    const checked = e.currentTarget.checked,
      inputReferenceSystem = checked ? AppConstants.CRS_BNG : AppConstants.CRS_LONLAT;

    AppActions.referenceSystemChanged(inputReferenceSystem);
  },

  render() {
    const checkboxValue = this._inputReferenceSystemMapping();

    return (
      <div id="tabContent">
        <div id="edit" className="tab-item col s12 active">
          <JsonEditInput geoJson={this.props.geoJson} />
        </div>
        <div id="list" className="tab-item col s12">
          <FeatureList geoJson={this.props.geoJson} />
        </div>
        <div className="switch">
          <label>
            Lon, Lat
            <input
              ref="inputReferenceSystem"
              type="checkbox"
              value={checkboxValue}
              onChange={this.onFormatChange}
              className="z-depth-1"
            />
            <span className="lever"></span>
            OS National Grid
          </label>
          <i className="material-icons tiny right">open_in_new</i>
          <a href={CRS_LINK} title="Explain the difference between coordinate reference systems" className="pink-text right">What is this?</a>
        </div>
      </div>
    );
  },

  _inputReferenceSystemMapping() {
    return this.props.inputReferenceSystem === AppConstants.CRS_BNG;
  }
});

module.exports = ManualEditPanel;
