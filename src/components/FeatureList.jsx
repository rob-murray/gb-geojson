"use strict";

import React from "react";
import FeatureRow from "./FeatureRow.jsx";
import FeatureParser from "../geo/FeatureParser";

const FeatureList = React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      geoJson: {}
    };
  },

  render() {
    const features = FeatureParser.features(this.props.geoJson);

    return (
      <div id="featureListContainer">
        <ul className="collection">
          {features.map(function(f, i) {
            return <FeatureRow key={i} feature={f} />;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = FeatureList;
