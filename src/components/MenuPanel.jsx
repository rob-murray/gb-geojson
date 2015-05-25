var TabSwitcher = require("./TabSwitcher.jsx"),
  AppActions = require('../actions/AppActions'),
  AppConstants = require('../constants/AppConstants');

var MenuPanel = React.createClass({
  getInitialState: function() {
    return {
      tabSelectedIndex: 0
    };
  },

  switchTab: function(tabIndex) {
    //this.setState({tabSelectedIndex: tabIndex});
    // the tab switching is outside of react atm :(
  },

  render: function(){
    return (
      <div id="menu-panel" className="map-panel card grey lighten-4 z-depth-2">
        <ul id="dropdown-menu" className="dropdown-content">
          <li><a href="https://github.com/rob-murray/gb-geojson" title="What is this all about?">About</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper green lighten-1">
            <a href="#" className="brand-logo">GB-GeoJson</a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a
                  onClick={this._clearMap}
                  href="#clearMap"
                  title="Clear map" >
                  <i className="mdi-content-clear"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="dropdown-button" data-activates="dropdown-menu">
                  <i className="mdi-navigation-more-vert right"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="card-content grey-text darken-3-text">
          <TabSwitcher onTabClick={this.switchTab} />
          { this.props.children }
        </div>
      </div>
    );
  },

  _clearMap: function(e) {
    e.preventDefault();
    AppActions.destroy();
  },
});

module.exports = MenuPanel;
