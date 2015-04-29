'use strict';

var Reflux = require('reflux');
var Actions = require('actions/AppActionCreators');
var api = require('webutils/api');

var users = {};

var AppStore = Reflux.createStore({
    listenables: Actions,

    onConnect: function(settings) {
        api
            .connect(settings)
            .then(this._onConnectSuccess)
            .then(this._subscribeWSEvents)
            .catch(function(err) {
                console.log(err);
            });
    },

    _onConnectSuccess: function(response) {
        this.trigger({ logged: true, you: response.user });

        return response.ws;
    },

    _subscribeWSEvents: function(socket) {
        socket.onmessage = this._onWsMessage.bind(this, socket);
    },

    _onWsMessage: function(socket, message) {
        var data = JSON.parse(message.data),
            newUser = data.payload.user,
            newUserId = newUser.id;


        this._users[newUserId] = newUser;

        this.trigger({ users: this._users });
    },

    _users: {}

});

module.exports = AppStore;
