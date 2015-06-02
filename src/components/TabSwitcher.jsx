"use strict";

var EDIT_TAB = 0,
  FEATURE_LIST_TAB = 1;

var TabSwitcher = React.createClass({
  onClick: function(item) {
    this.props.onTabClick(item);
  },

  render: function() {
    return (
      <ul className="tabs">
        <li className="tab col s3">
          <a href="#edit" onClick={this.onClick.bind(this, EDIT_TAB)} className="blue-text accent-2">
            <i className="small mdi-editor-border-color"></i>
          </a>
        </li>
        <li className="tab col s3">
          <a href="#list" onClick={this.onClick.bind(this, FEATURE_LIST_TAB)} className="blue-text accent-2">
            <i className="small mdi-action-view-list"></i>
          </a>
        </li>
      </ul>
    );
  }
});

module.exports = TabSwitcher;
