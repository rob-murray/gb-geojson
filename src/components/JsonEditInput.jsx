var AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants');

function presentGeoJson(data) {
  return JSON.stringify(data);
}

var JsonEditInput = React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      isEditing: false
    };
  },

  getInitialState: function() {
    return {
      focus: false
    };
  },

  onInputFocus: function(e) {
    this.setState({focus: true});
  },

  onInputBlur: function(e) {
    this.setState({focus: false});
  },

  onInputChange: function(e) {
    if (e.currentTarget.value.trim()) {
      var data = JSON.parse(e.currentTarget.value);

      AppActions.create(
        data
      );
    }
  },

  render: function() {
    var classes = 'materialize-textarea',
      editableGeoJson = presentGeoJson(this.props.geoJson);

    if(this.state.focus) {
      classes = classes + ' selected-input';
    }

    return (
      <div id='jsonContainer' className='input-field'>
        <textarea
          rows='20'
          cols='10'
          className={classes}
          placeholder='{}'
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          value={editableGeoJson}
        />
      </div>
    );
  }

});

module.exports = JsonEditInput;
