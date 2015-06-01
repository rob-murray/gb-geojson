var OSOpenSpace = require('os-leaflet'),
  AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants'),
  GeoUtils = require('../geo/Utils'),
  LeafletDraw = require('leaflet-draw');

L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet-0.7.3/images';
var MAP_CONTROL_POSITION = 'topright';

function transformLayerToGeoJson(layer) {
  var features = [];
  layer.eachLayer(function(layer) {
    if ('toGeoJSON' in layer) {
      features.push(layer.toGeoJSON());
    }
    // or ?
  });
  return GeoUtils.featureCollection(features);
}

function transformGeoJsonToLayers(geojson, editableLayer) {
  editableLayer.clearLayers();
  L.geoJson(geojson, {}).eachLayer(function add(l) {
    addPopupToLayer(l)
    l.addTo(editableLayer);
  });
}

function addPopupToLayer(layer) {
  content = JSON.stringify(layer.toGeoJSON().properties);

  layer.bindPopup(L.popup({
    maxWidth: 600,
    maxHeight: 450,
  }, layer).setContent(content));
}

var OSMap = React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      mapCentre: [51.505, -0.09],
      mapZoom: 13,
      geoJson: {}
    };
  },

  componentDidMount: function () {
    this.map = this._createMap(this.getDOMNode());
    this.setupMap();
  },

  componentWillUnmount: function() {
    this.map = null;
  },

  componentWillUpdate: function(nextProps, nextState) {
    transformGeoJsonToLayers(nextProps.geoJson, this.editableLayer);

    if(this.editableLayer.getBounds().isValid()) {
      this.map.fitBounds(this.editableLayer.getBounds());
    }
  },

  setupMap: function () {
    this.map.setView(this.props.mapCentre, this.props.mapZoom);
    transformGeoJsonToLayers(this.props.geoJson, this.editableLayer);
    this._enableEditControl();
  },

  render: function(){
    return (
      <div className="map"></div>
    );
  },

  _createMap: function (element) {
    var map = new L.Map(element, {
      crs: L.OSOpenSpace.getCRS(),
      continuousWorld: true,
      worldCopyJump: false,
      minZoom: 0,
      maxZoom: L.OSOpenSpace.RESOLUTIONS.length - 1,
      zoomControl: false
    });
    map.addLayer(L.tileLayer.OSOpenSpace("EC9EDE7DAD732ABAE0430C6CA40AB812", {}));
    new L.Control.Zoom({ position: MAP_CONTROL_POSITION }).addTo(map);
    this.editableLayer = L.featureGroup().addTo(map);
    return map;
  },

  _clearMap: function() {
    if(this.editableLayer) {
      this.editableLayer.clearLayers();
    }
  },

  _enableEditControl: function() {
    if(!this._drawControl) {
      this.map.on('draw:edited', this._update);
      this.map.on('draw:deleted', this._update);
      this.map.on('draw:created', this._created);
    }

    this._drawControl = new L.Control.Draw({
      position: MAP_CONTROL_POSITION,
      edit: {
        featureGroup: this.editableLayer
      },
       draw: {
          circle: false
      }
    });

    this.map.addControl(this._drawControl);
  },

  _created: function(e) {
    this.editableLayer.addLayer(e.layer);
    this._update();
  },

  _update: function() {
    transformGeoJsonToLayers(this.editableLayer.toGeoJSON(), this.editableLayer);
    this._publish();
  },

  _publish: function() {
    AppActions.create(
      transformLayerToGeoJson(this.editableLayer),
      AppConstants.CRS_LONLAT
    );
  }
});

module.exports = OSMap;
