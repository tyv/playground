'use strict';

var PlaygroundApp = require('./PlaygroundApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={PlaygroundApp}>
    <Route name="/" handler={PlaygroundApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
