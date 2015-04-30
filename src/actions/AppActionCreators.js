'use strict';

var Reflux = require('reflux');

var AppActionCreators = Reflux.createActions([
    'connect', // login and connect to the API WebSoket
    'toggle' // mute/unmute attendie
]);


module.exports = AppActionCreators;
