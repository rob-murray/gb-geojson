"use strict";

import React from "react";

function iconNameForFeatureType(featureType) {
  switch(featureType) {
    case 'Point':
        return 'place';
    case 'LineString':
        return 'crop';
    case 'Polygon':
        return 'crop_landscape';
    default:
        return 'crop_square';
  }
}

export default React.createClass({
  propTypes: {
    feature: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      feature: {}
    };
  },

  render() {
    const feature = this.props.feature,
      title = feature.type,
      iconName = iconNameForFeatureType(feature.type);

    return (
      <li className='collection-item avatar'>
        <i className="circle large material-icons">{iconName}</i>
        <span className='title'>{title}</span>
        <p>
          {Object.keys(feature.properties).map(function(k,i){
            return <span className='feature-property' key={i}>{k}: {feature.properties[k]}<br /></span>;
          })}
        </p>
      </li>
    );
  }
});
