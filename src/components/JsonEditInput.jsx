"use strict";

import React from "react";
import Importer from "../core/Importer";
import CodeMirrorEditor from "./CodeMirrorEditor.jsx";
import Utils from "../core/Utils";

function presentGeoJson(data) {
  return JSON.stringify(data, null, 2);
}

export default React.createClass({
  propTypes: {
    geoJson: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      errors: null
    };
  },

  componentWillReceiveProps(_) {
    // assume GeoJson passed in is valid :)
    this.setState({
      errors: null
    });
  },

  onInputChange(e) {
    // handle update from editor
    Importer.handleStringImport(e.target.value, undefined, this.onError);
  },

  onError(errors) {
    this.setState({errors: errors});
  },

  render() {
    let errorClasses = "help",
      hasError = false,
      editableJsonContent, errorDisplay;

    if(!this.state.errors) {
      // we dont want to do anything with this in error state, so dont force
      // dom update of the json input
      editableJsonContent = presentGeoJson(this.props.geoJson);
    }

    if(this.state.errors) {
      const errorMessage = Utils.errorsToSentence(this.state.errors);
      errorClasses += " error-message";
      hasError = true;

      errorDisplay = <div id="editErrors" ref="errors" className="error">
          <p className={errorClasses}>{errorMessage}</p>
        </div>;
    }

    return (
      <div id="jsonContainer" className="input-field">
        <CodeMirrorEditor value={editableJsonContent} onChange={this.onInputChange} hasError={hasError} />
        {errorDisplay}
      </div>
    );
  }
});
