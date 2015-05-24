var JsonEditInput = require('./JsonEditInput.jsx'),
  FeatureList = require('./FeatureList.jsx'),
  AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants');

var ManualEditPanel = React.createClass({
  getDefaultProps: function() {
    return {
      isEditing: false,
      inputReferenceSystem: AppConstants.CRS_LONLAT
    };
  },

  onFormatChange: function(e) {
    var checked = e.currentTarget.checked;
    var inputReferenceSystem = checked ? AppConstants.CRS_BNG : AppConstants.CRS_LONLAT;
    AppActions.referenceSystemChanged(
      inputReferenceSystem
    );
  },

  render: function(){
    var checkbox_value = this._inputReferenceSystemMapping();

    return (
      <div>
        <div id="edit" className="col s12 active">
          <JsonEditInput geoJson={this.props.geoJson} />
        </div>
        <div id="list" className="col s12">
          <FeatureList geoJson={this.props.geoJson} />
        </div>
        <div className="switch">
          <label>
            Lon/Lat
            <input
              ref="inputReferenceSystem"
              type="checkbox"
              value={checkbox_value}
              onChange={this.onFormatChange}
            />
            <span className="lever"></span>
            BNG
          </label>
        </div>
      </div>
    );
  },

  _inputReferenceSystemMapping: function() {
    this.props.inputReferenceSystem == AppConstants.CRS_BNG;
  }
});

module.exports = ManualEditPanel;
