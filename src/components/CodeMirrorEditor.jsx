var CodeMirror = require('codemirror');

var CodeMirrorEditor = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  componentDidMount: function() {
    this.editor = CodeMirror.fromTextArea(
      this.refs.editor.getDOMNode(), {
        mode: 'application/json',
        matchBrackets: true,
        tabSize: 2,
        theme: 'solarized-light',
        lineNumbers: true,
        smartIndent: false
    });
    this.editor.on('change', this.handleChange);
  },

  componentDidUpdate: function() {
    if (this.editor) {
      if (this.props.value != null || this.props.value !== undefined) {
        if (this.editor.getValue() !== this.props.value) {
          this.editor.setValue(this.props.value);
        }
      }
    }
  },

  handleChange: function() {
    if (this.editor) {
      var value = this.editor.getValue();
      if (value !== this.props.value) {
        this.props.onChange && this.props.onChange({target: {value: value}});
        if (this.props.value != null || this.props.value !== undefined) {
          this.editor.setValue(this.props.value);
        }
      }
    }
  },

  render: function() {
    var editor = React.createElement('textarea', {
      ref: 'editor',
      value: this.props.value,
      onChange: this.props.onChange
    });

    return React.createElement('div', {style: this.props.style, className: this.props.className}, editor);
  }
});

module.exports = CodeMirrorEditor;
