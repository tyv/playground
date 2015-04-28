'use strict';

var Reflux = require('reflux');
var Actions = require('actions/AppActionCreators');
var api = require('webutils/api');

var AppStore = Reflux.createStore({
  listenables: Actions,

  onConnect: function(settings) {
    api
        .connect(settings)
        .then(function(socket) {
            console.log('CONNECTED!', socket);
        })
        .catch(function(err) {
            console.log(err);
        });
  }

});

module.exports = AppStore;
