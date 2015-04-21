'use strict';

var PlaygroundApp = require('./PlaygroundApp'),
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    app = require('./api');

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


app
    .create({ login: 'abc', password: 'abc' })
    .then(function(data) { console.log('1', data) }, function(e) { console.log('11', e) });

