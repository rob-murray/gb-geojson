"use strict";

const React = require('react');

const EDIT_TAB = 0, FEATURE_LIST_TAB = 1;

const TabSwitcher = React.createClass({
  onClick(item) {
    this.props.onTabClick(item);
  },

  render() {
    return (
      <ul className="tabs">
        <li className="tab col s3">
          <a href="#edit" onClick={this.onClick.bind(this, EDIT_TAB)} className="blue-text accent-2">
            <i className="small material-icons">mode_edit </i>
          </a>
        </li>
        <li className="tab col s3">
          <a href="#list" onClick={this.onClick.bind(this, FEATURE_LIST_TAB)} className="blue-text accent-2">
            <i className="small material-icons">view_list</i>
          </a>
        </li>
      </ul>
    );
  }
});

module.exports = TabSwitcher;
