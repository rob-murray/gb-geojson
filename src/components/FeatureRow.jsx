"use strict";

function iconClassesForFeatureType(featureType) {
  var classes = 'circle large';
  switch(featureType) {
    case 'Point':
        classes += ' mdi-maps-place';
        break;
    case 'LineString':
        classes += ' mdi-content-remove';
        break;
    case 'Polygon':
        classes += ' mdi-image-panorama-wide-angle';
        break;
    default:
        classes += ' mdi-maps-layers';
        break;
  }
  return classes;
}

var FeatureRow = React.createClass({
  propTypes: {
    feature: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      feature: {}
    };
  },

  render: function() {
    var feature = this.props.feature,
      title = feature.type,
      iconClasses = iconClassesForFeatureType(feature.type);

    return (
      <li className='collection-item avatar'>
        <i className={iconClasses}></i>
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

module.exports = FeatureRow;
