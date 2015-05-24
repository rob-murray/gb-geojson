var FeatureRow = require('./FeatureRow.jsx'),
  FeatureParser = require('../geo/FeatureParser');

var FeatureList = React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      geoJson: {}
    };
  },

  render: function() {
    var features = FeatureParser.features(this.props.geoJson);

    return (
      <ul className="collection">
        {features.map(function(f, i) {
          return <FeatureRow key={i} feature={f} />;
        })}
      </ul>
    );
  }
});

module.exports = FeatureList;
