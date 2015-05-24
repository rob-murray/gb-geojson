
// todo improve presentation
function presentFeature(data) {
  return JSON.stringify(data.properties);
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
      featureType = feature.type

    return (
      <li className='collection-item'>
        <span className='title'>{featureType}</span>
        <p>{presentFeature(feature)}
        </p>
      </li>
    );
  }
});

module.exports = FeatureRow
