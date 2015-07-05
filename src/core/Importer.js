"use strict";

var GeoJsonHint = require('geojsonhint'),
  AppActions = require('../actions/AppActions'),
  Utils = require('./Utils');


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

// default actions
function defaultSuccess(data) {
  AppActions.create(
    data
  );
}

function defaultError(errors) {
  alert(
    Utils.errorsToSentence(errors)
  );
}

module.exports = {
  /**
   * Receive a string; validate and parse.
   */
  handleStringImport: function(input, onSuccess, onError) {
    if(onSuccess === undefined) {
      onSuccess = defaultSuccess;
    }

    if(onError === undefined) {
      onError = defaultError;
    }

    validateInput(input, onSuccess, onError);
  },

  /**
   * Receive a changeEvent from a File input; validate and parse.
   */
  handleFileImport: function(changeEvent, onSuccess, onError) {
    changeEvent.preventDefault();
    if(onSuccess === undefined) {
      onSuccess = defaultSuccess;
    }

    if(onError === undefined) {
      onError = defaultError;
    }

    if (!window.FileReader) {
      onError(
        new Error("Sorry, your browser does not support file operations.")
      );
      return;
    }

    var reader = new FileReader(),
      file = changeEvent.target.files[0];

    reader.onload = function(file) {
      validateInput(file.target.result, onSuccess, onError);
    }

    reader.readAsText(file);
  }
};
