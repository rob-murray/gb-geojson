"use strict";

import GeoJsonHint from "geojsonhint";
import AppActions from "../actions/AppActions";
import Utils from "./Utils";

function validateInput(data, successCallback, errorCallback) {
  const errors = GeoJsonHint.hint(data);

  if (errors instanceof Error) {
    errorCallback(errors);
  } else if (errors.length) {
    errorCallback(errors);
  }else{
    try {
      successCallback(JSON.parse(data));
    } catch(e) {
      errorCallback(e);
    }
  }
}

// default actions
function defaultSuccess(data) {
  AppActions.create(data);
}

function defaultError(errors) {
  alert(Utils.errorsToSentence(errors));
}

export default {
  /**
   * Receive a string; validate and parse.
   */
  handleStringImport(input, onSuccess, onError) {
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
  handleFileImport(changeEvent, onSuccess, onError) {
    changeEvent.preventDefault();
    if(onSuccess === undefined) {
      onSuccess = defaultSuccess;
    }

    if(onError === undefined) {
      onError = defaultError;
    }

    if (!window.FileReader) {
      onError(new Error("Sorry, your browser does not support file operations."));
      return;
    }

    const reader = new FileReader(), file = changeEvent.target.files[0];

    reader.onload = function(file) {
      validateInput(file.target.result, onSuccess, onError);
    };

    reader.readAsText(file);
  }
};
