"use strict";

var AppActions = require('../actions/AppActions'),
  GeoJsonHint = require('geojsonhint'),
  CodeMirrorEditor = require('./CodeMirrorEditor.jsx');

function presentGeoJson(data) {
  return JSON.stringify(data, null, 2);
}

function errorsToSentence(errors) {
  if (errors instanceof Error) {
    return errors.toString();
  }

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
      errors: null
    };
  },

  componentWillReceiveProps: function(_) {
    // assume GeoJson passed in is valid :)
    this.setState({
      errors: null
    });
  },

  onInputChange: function(e) {
    // handle update from editor
    validateInput(e.target.value, success, this.onError);
  },

  onError: function(errors) {
    this.setState({errors: errors});
  },

  render: function() {
    var errorClasses = 'help',
      hasError = false,
      editableJsonContent,
      errorDisplay;

    if(!this.state.errors) {
      // we dont want to do anything with this in error state, so dont force
      // dom update of the json input
      editableJsonContent = presentGeoJson(this.props.geoJson);
    }

    if(this.state.errors) {
      var errorMessage = errorsToSentence(this.state.errors);
      errorClasses += " error-message";
      hasError = true;

      errorDisplay = <div id="editErrors" ref="errors" className="error">
          <p className={errorClasses}>{errorMessage}</p>
        </div>;
    }

    return (
      <div id='jsonContainer' className='input-field'>
        <CodeMirrorEditor value={editableJsonContent} onChange={this.onInputChange} hasError={hasError} />
        {errorDisplay}
      </div>
    );
  }
});

module.exports = JsonEditInput;
