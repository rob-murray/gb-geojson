var //JsonInput = require('./JsonInput.jsx'),
  //FeatureList = require('./FeatureList.jsx'),
  AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants');

var ManualEditPanel = React.createClass({
  getDefaultProps: function() {
    return {
      isEditing: false,
      inputCrs: AppConstants.CRS_LONLAT
    };
  },

  onFormatChange: function(e) {
    var checked = e.currentTarget.checked;
    var inputCrs = checked ? AppConstants.CRS_BNG : AppConstants.CRS_LONLAT;
    AppActions.formatChange(
      inputCrs
    );
  },

  render: function(){
    var checkbox_value = this._inputCrsMapping();

    return (
      <div>
        <div id="edit" className="col s12 active">

        </div>
        <div id="list" className="col s12">

        </div>
        <div className="switch">
          <label>
            Lon/Lat
            <input
              ref="inputCrs"
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

  _inputCrsMapping: function() {
    this.props.inputCrs == AppConstants.CRS_BNG;
  }
});

module.exports = ManualEditPanel;
