"use strict";

const React = require('react'),
  ReactDOM = require('react-dom'),
  TabSwitcher = require("./TabSwitcher.jsx"),
  AppActions = require('../actions/AppActions'),
  Importer = require('../core/Importer'),
  Exporter = require('../core/Exporter');

const MenuPanel = React.createClass({
  getInitialState() {
    return {
      tabSelectedIndex: 0,
      pinned: false
    };
  },

  switchTab(_) {
    //this.setState({tabSelectedIndex: tabIndex});
    // the tab switching is outside of react atm :(
  },

  render() {
    let menuPanelClasses = "map-panel grey lighten-4 z-depth-2",
      pinActionButtonIcon = "arrow_drop_up",
      pinActionButtonTitle = "Hide edit panel",
      panelContentClasses = "panel-container grey-text darken-3-text";

    if (this.state.pinned) {
      menuPanelClasses += " pinned";
      pinActionButtonIcon = "arrow_drop_down";
      panelContentClasses += " hideme";
      pinActionButtonTitle = "Display edit panel";
    }

    return (
      <div id="menu-panel" className={menuPanelClasses}>
        <ul id="dropdown-menu" className="dropdown-content">
          <li><a href="https://github.com/rob-murray/gb-geojson" title="What is this all about?">About</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper pink">
            <a href="#" className="brand-logo">GB-GeoJson</a>
            <ul className="right">
              <li>
                <a
                  onClick={this._load}
                  href="#load"
                  title="Upload local file" >
                  <i className="material-icons">folder_open</i>
                </a>
                <input ref="importInput" type="file" className="hideme" onChange={Importer.handleFileImport} />
              </li>
              <li>
                <a
                  onClick={this._save}
                  href="#save"
                  title="Download GeoJson to local file" >
                  <i className="material-icons">save</i>
                </a>
                <a ref="downloadLink" className="hideme" />
              </li>
              <li>
                <a
                  onClick={this._clearMap}
                  href="#clearMap"
                  title="Clear map" >
                  <i className="material-icons">clear</i>
                </a>
              </li>
              <li>
                <a
                  onClick={this._pinPanel}
                  href="#pinPanel"
                  title={pinActionButtonTitle} >
                  <i className="material-icons">{pinActionButtonIcon}</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={panelContentClasses}>
          <TabSwitcher onTabClick={this.switchTab} />
          { this.props.children }
        </div>
      </div>
    );
  },

  _load(e) {
    e.preventDefault();

    ReactDOM.findDOMNode(this.refs.importInput).click();
  },

  _save(e) {
    e.preventDefault();

    Exporter.exportAsFile(this.refs.downloadLink);
  },

  _pinPanel(e) {
    e.preventDefault();

    this.setState({ pinned: !this.state.pinned })
  },

  _clearMap(e) {
    e.preventDefault();

    AppActions.destroy();
  }
});

module.exports = MenuPanel;
