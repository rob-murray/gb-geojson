"use strict";

var TabSwitcher = require("./TabSwitcher.jsx"),
  AppActions = require('../actions/AppActions');

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

  _pinPanel: function(e) {
    e.preventDefault();
    this.setState({ pinned: !this.state.pinned })
  },

  _clearMap: function(e) {
    e.preventDefault();
    AppActions.destroy();
  },
});

module.exports = MenuPanel;
