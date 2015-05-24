var OSMap = require('./OSMap.jsx'),
  MenuPanel = require('./MenuPanel.jsx'),
  ManualEditPanel = require('./ManualEditPanel.jsx'),
  GeoStore = require('../stores/GeoStore'),
  AppConstants = require('../constants/AppConstants');

function getState() {
  return {
    item: GeoStore.getItem()
  };
}

var App = React.createClass({
  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    GeoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GeoStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var geoJson = this.state.item.geoJson,
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

  _geoJsonForMapView: function() {
    return GeoStore.getItem(AppConstants.CRS_LONLAT).geoJson
  },

  /**
   * Event handler for 'change' events coming from the GeoStore
   */
  _onChange: function() {
    var state = getState()
    console.log(["App._onChange", JSON.stringify(state)]);
    this.setState(state);
  }
});

module.exports = App;
