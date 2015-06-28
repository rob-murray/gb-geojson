"use strict";

var TabSwitcher = require("./TabSwitcher.jsx"),
  AppActions = require('../actions/AppActions'),
  Importer = require('../core/Importer'),
  Exporter = require('../core/Exporter');

var MenuPanel = React.createClass({
  getInitialState: function() {
    return {
      tabSelectedIndex: 0,
      pinned: false
    };
  },

  switchTab: function(_) {
    //this.setState({tabSelectedIndex: tabIndex});
    // the tab switching is outside of react atm :(
  },

  render: function(){
    var menuPanelClasses = "map-panel grey lighten-4 z-depth-2",
      pinActionButtonIcon = "mdi-navigation-arrow-drop-up",
      pinActionButtonTitle = "Hide edit panel",
      panelContentClasses = "panel-container grey-text darken-3-text";

    if (this.state.pinned) {
      menuPanelClasses += " pinned";
      pinActionButtonIcon = "mdi-navigation-arrow-drop-down";
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
                  title="Open file" >
                  <i className="mdi-maps-layers-clear"></i>
                </a>
                <input ref="importInput" type="file" className="hideme" onChange={Importer.handleFileImport} />
              </li>
              <li>
                <a
                  onClick={this._save}
                  href="#save"
                  title={pinActionButtonTitle} >
                  <i className="mdi-maps-layers-clear"></i>
                </a>
                <a ref="downloadLink" className="hideme" />
              </li>
              <li>
                <a
                  onClick={this._clearMap}
                  href="#clearMap"
                  title="Clear map" >
                  <i className="mdi-maps-layers-clear"></i>
                </a>
              </li>
              <li>
                <a
                  onClick={this._pinPanel}
                  href="#pinPanel"
                  title={pinActionButtonTitle} >
                  <i className={pinActionButtonIcon}></i>
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

  _load: function(e) {
    e.preventDefault();

    React.findDOMNode(this.refs.importInput).click();
  },

  _save: function(e) {
    e.preventDefault();

    Exporter.exportAsFile(this.refs.downloadLink);
  },

  _pinPanel: function(e) {
    e.preventDefault();

    this.setState({ pinned: !this.state.pinned })
  },

  _clearMap: function(e) {
    e.preventDefault();

    AppActions.destroy();
  }
});

module.exports = MenuPanel;
