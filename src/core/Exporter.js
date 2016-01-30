"use strict";

import ReactDOM from "react-dom";
import GeoStore from "../stores/GeoStore";
import Utils from "./Utils";

const MIME_TYPE = "application/json",
  FILE_NAME = "gb-geojson.json";

function getGeoJsonAsString() {
  return JSON.stringify(GeoStore.getItem().geoJson);
}

function getBlobUrl(data, onError) {
  if (!window.Blob) {
    onError(new Error("Sorry, your browser does not support file operations."));
    return;
  }
  window.URL = window.URL || window.webkitURL;
  const jsonBlob = new Blob([data], {type: MIME_TYPE});

  return window.URL.createObjectURL(jsonBlob);
}

function cleanUp(a) {
  a.dataset.disabled = true;

  setTimeout(() => {
    window.URL.revokeObjectURL(a.href);
  }, 1500);
}

function defaultError(errors) {
  alert(Utils.errorsToSentence(errors));
}

export default {
  /**
   * Export the current GeoJson as a file using a dom element to create a blob url
   */
  exportAsFile(elementRef, onSuccess, onError) {
    const data = getGeoJsonAsString(),
      linkElement = ReactDOM.findDOMNode(elementRef);

    if (onError === undefined) {
      onError = defaultError;
    }

    const dataUrl = getBlobUrl(data, onError);
    linkElement.href = dataUrl;
    linkElement.download = FILE_NAME;
    linkElement.textContent = FILE_NAME;
    linkElement.dataset.downloadurl = [MIME_TYPE, FILE_NAME, dataUrl].join(":");
    linkElement.onclick = function(e) {
      cleanUp(this);
    };

    linkElement.click();

    if (onSuccess) {
      onSuccess();
    }
  }
};
