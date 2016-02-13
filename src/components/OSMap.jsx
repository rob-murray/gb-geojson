"use strict";

import OSOpenSpace from "os-leaflet";
import AppActions from "../actions/AppActions";
import AppConstants from "../constants/AppConstants";
import Utils from "../core/Utils";
import LeafletDraw from "leaflet-draw";
import React from "react";
import ReactDOM from "react-dom";

L.Icon.Default.imagePath = "http://cdn.leafletjs.com/leaflet-0.7.3/images";
const MAP_CONTROL_POSITION = "topright", MENU_PANEL_WIDTH = 500;

function transformLayerToGeoJson(layer) {
  const features = [];
  layer.eachLayer(layer => {
    if ("toGeoJSON" in layer) {
      features.push(layer.toGeoJSON());
    }
    // or ?
  });

  return Utils.featureCollection(features);
}

function addPopupToLayer(layer) {
  const content = JSON.stringify(layer.toGeoJSON().properties);

  layer.bindPopup(L.popup({
    maxWidth: 600,
    maxHeight: 450,
  }, layer).setContent(content));
}

function transformGeoJsonToLayers(geojson, editableLayer) {
  editableLayer.clearLayers();

  L.geoJson(geojson, {}).eachLayer(l => {
    addPopupToLayer(l);
    l.addTo(editableLayer);
  });
}

export default React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      mapCentre: [51.505, -0.09],
      mapZoom: 13,
      geoJson: {}
    };
  },

  componentDidMount() {
    this.map = this._createMap(ReactDOM.findDOMNode(this));
    this.setupMap();
  },

  componentWillUnmount() {
    this.map = null;
  },

  componentWillUpdate(nextProps, nextState) {
    transformGeoJsonToLayers(nextProps.geoJson, this.editableLayer);

    if(this.editableLayer.getBounds().isValid()) {
      this.map.fitBounds(this.editableLayer.getBounds(), {
        paddingTopLeft: [MENU_PANEL_WIDTH, 0]
      });
    }
  },

  setupMap() {
    this.map.setView(this.props.mapCentre, this.props.mapZoom);
    transformGeoJsonToLayers(this.props.geoJson, this.editableLayer);
    this._enableEditControl();
  },

  render() {
    return (
      <div className="map"></div>
    );
  },

  _createMap(element) {
    const map = new L.Map(element, {
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

  _clearMap() {
    if(this.editableLayer) {
      this.editableLayer.clearLayers();
    }
  },

  _enableEditControl() {
    if(!this._drawControl) {
      this.map.on("draw:edited", this._update);
      this.map.on("draw:deleted", this._update);
      this.map.on("draw:created", this._created);
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

  _created(e) {
    this.editableLayer.addLayer(e.layer);
    this._update();
  },

  _update() {
    transformGeoJsonToLayers(this.editableLayer.toGeoJSON(), this.editableLayer);
    this._publish();
  },

  _publish() {
    AppActions.create(transformLayerToGeoJson(this.editableLayer), AppConstants.CRS_LONLAT);
  }
});
