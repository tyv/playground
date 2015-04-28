'use strict';

var Reflux = require('reflux');
var Actions = require('actions/AppActionCreators');
var api = require('webutils/api');

var users = [
        { muted: true, id: '123', isActiveSpeaker: false },
        { muted: false, id: '1234', isActiveSpeaker: true },
        { muted: false, id: '12345', isActiveSpeaker: false }
    ];

var AppStore = Reflux.createStore({
  listenables: Actions,

  onConnect: function(settings) {
    var that = this;

    api
        .connect(settings)
        .then(function(socket) {
            that.trigger({ logged: true, users: users });
        })
        .catch(function(err) {
            console.log(err);
        });
  }

});

module.exports = AppStore;
