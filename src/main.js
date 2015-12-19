(function () {
  "use strict";

  const React = require('react'),
    ReactDOM = require('react-dom'),
    App = require('./components/App.jsx'),
    isProduction = process.env.NODE_ENV === 'production';

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );

  require('./ga')(isProduction);
})();
