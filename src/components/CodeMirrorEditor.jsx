"use strict";

var CodeMirror = require('codemirror');

function parseable(input) {
  try {
    JSON.parse(input);
  } catch(e) {
    return false;
  }
  return true;
}

function changesShouldBeSentForUpdate(editorContent, propValue) {
  // If the current data is invalid then we cant compare so update
  if(!parseable(editorContent) || !parseable(propValue)) {
    return true;
  }

  // This naive geojson object comparison should be enough to know if we should update
  return (JSON.stringify(JSON.parse(editorContent)) !== JSON.stringify(JSON.parse(propValue)));
}

// CodeMirror React component
// based on https://github.com/ForbesLindesay/react-code-mirror/blob/master/index.js
//
var CodeMirrorEditor = React.createClass({
  getInitialState: function() {
    return {
      isControlled: this.props.value != null
    };
  },

  propTypes: {
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  componentDidMount: function() {
    this.editor = CodeMirror.fromTextArea(
      this.refs.editor.getDOMNode(), {
        mode: 'application/json',
        matchBrackets: true,
        tabSize: 2,
        lineNumbers: true,
        smartIndent: false
    });

    this.editor.on('change', this.handleChange);
  },

  componentDidUpdate: function() {
    if (this.editor) {
      if (this.props.value != null || this.props.value !== undefined) {
        // simply update the editor if the incoming content
        // string comparison is different to current
        if (this.editor.getValue() !== this.props.value) {
          this.editor.setValue(this.props.value);
        }
      }
    }
  },

  handleChange: function() {
    if (this.editor) {
      var currentValue = this.editor.getValue();

      // we only want to push the update up if the change is significant,
      // otherwise the irrelevant changes will come back again updating the
      // editor
      if(changesShouldBeSentForUpdate(currentValue, this.props.value)) {
        this.props.onChange({
          target: {value: currentValue}
        });
      }
    }
  },

  render: function() {
    var editor = React.createElement('textarea', {
      ref: 'editor',
      value: this.props.value,
      defaultValue: this.props.defaultValue,
      onChange: this.props.onChange,
      className: 'editor'
    });

    return React.createElement('div', {className: 'editor-container'}, editor);
  }
});

module.exports = CodeMirrorEditor;
