var AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants'),
  GeoJsonHint = require('geojsonhint');

function presentGeoJson(data) {
  return JSON.stringify(data, null, 2);
}

function errorsToSentence(errors) {
  return errors.map(function(err){
    return err.message;
  }).join(', ');
}

function validateInput(data, successCallback, errorCallback) {
  var errors = GeoJsonHint.hint(data);
  if (errors instanceof Error) {
    errorCallback(errors);
  } else if (errors.length) {
    errorCallback(errors);
  }else{
    try {
      successCallback(
        JSON.parse(data)
      );
    } catch(e) {
      errorCallback(e);
    }
  }
}

function success(data) {
  AppActions.create(
    data
  );
}

var JsonEditInput = React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      focus: false,
      errors: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      errors: null
    });
  },

  onInputFocus: function(e) {
    this.setState({focus: true});
  },

  onInputBlur: function(e) {
    this.setState({focus: false});
  },

  onInputChange: function(e) {
    if (e.currentTarget.value.trim()) {
      validateInput(e.currentTarget.value, success, this.onError);
    }
  },

  onError: function(errors) {
    this.setState({errors: errors})
  },

  render: function() {
    var inputClasses = 'materialize-textarea',
      errorClasses = 'help',
      editableGeoJson,
      errorDisplay;

    // todo urggh; there's some junk here

    if(!this.state.errors) {
      // we dont want to do anything with this in error state, so dont force
      // dom update of the json input
      editableGeoJson = presentGeoJson(this.props.geoJson);
    }

    if(this.state.focus) {
      inputClasses = inputClasses + ' selected-input';
    }

    if(this.state.errors) {
      var errorMessage = errorsToSentence(this.state.errors),
        errorClasses = "help error-message"
      errorDisplay = <div ref="errors" className="error">
          <p className={errorClasses}>{errorMessage}</p>
        </div>
      inputClasses = inputClasses + " invalid";
    }

    return (
      <div id='jsonContainer' className='input-field'>
        <textarea
          rows='20'
          cols='10'
          className={inputClasses}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          value={editableGeoJson}
        />
        {errorDisplay}
      </div>
    );
  }
});

module.exports = JsonEditInput;
