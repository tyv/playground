'use strict';

var PlaygroundApp = require('./PlaygroundApp'),
    React = require('react'),

    Router = require('react-router'),
    Route = Router.Route;

if (process.env.NODE_ENV !== 'production') {
    require('../styles/main.styl');
}

var Routes = (
    <Route handler={PlaygroundApp}>
        <Route name="/" handler={PlaygroundApp}/>
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.body);
});

