"use strict";

var JsonEditInput = require('./JsonEditInput.jsx'),
  FeatureList = require('./FeatureList.jsx'),
  AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants');

var CRS_LINK = 'https://github.com/rob-murray/gb-geojson#what-is-the-difference-between-lon-lat-and-os-national-grid';

var ManualEditPanel = React.createClass({
  getDefaultProps: function() {
    return {
      inputReferenceSystem: AppConstants.CRS_LONLAT
    };
  },

  onFormatChange: function(e) {
    var checked = e.currentTarget.checked,
      inputReferenceSystem = checked ? AppConstants.CRS_BNG : AppConstants.CRS_LONLAT;

    AppActions.referenceSystemChanged(
      inputReferenceSystem
    );
  },

  render: function(){
    var checkboxValue = this._inputReferenceSystemMapping();

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
          <i className="mdi-action-open-in-new tiny right"></i>
          <a href={CRS_LINK} title="Explain the difference between coordinate reference systems" className="pink-text right">What is this?</a>
        </div>
      </div>
    );
  },

  _inputReferenceSystemMapping: function() {
    return this.props.inputReferenceSystem === AppConstants.CRS_BNG;
  }
});

module.exports = ManualEditPanel;
