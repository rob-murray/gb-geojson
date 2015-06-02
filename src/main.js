(function () {
  "use strict";
  var App = require('./components/App.jsx'),
    isProduction = process.env.NODE_ENV === 'production';

  React.render(
    <App />,
    document.getElementById('app')
  );

  require('./ga')(isProduction);
})();
