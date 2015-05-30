var CodeMirror = require('codemirror');

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
    console.log("componentDidUpdate")
    if (this.editor) {
      if (this.props.value != null || this.props.value !== undefined) {
        if (this.editor.getValue() !== this.props.value) {
          this.editor.setValue(this.props.value);
        }
      }
    }
  },

  handleChange: function() {
    console.log("handleChange")
    if (this.editor) {
      var value = this.editor.getValue();
      if (value !== this.props.value) {
        this.props.onChange({
          target: {value: value}
        });

        if (this.props.value != null || this.props.value !== undefined) {
          if (this.editor.getValue() !== this.props.value) {
            if (this.state.isControlled) {
              console.log("writing...")
              this.editor.setValue(this.props.value);
            } else {
              this.props.value = value;
            }
          }
        }
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
