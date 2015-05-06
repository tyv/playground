'use strict';

var Reflux = require('reflux');
var Actions = require('actions/AppActionCreators');
var api = require('webutils/api');
var _ = require('lodash');


var AppStore = Reflux.createStore({
    listenables: Actions,

    onConnect: function(settings) {
        api
            .connect(settings)
            .then(this._onConnectSuccess)
            .then(this._subscribeWSEvents, function(err) {
                console.log(err);
            });
    },

    onToggle: function(settings) {
        api
            .toggleStatus(settings)
            .then(this._onToggleSucces.bind(this, settings.id))
            .catch(function(err) {
                console.log('toggle ERR:', err);
            });
    },

    _onToggleSucces: function(id) {
        var user = this._users[id] || this._user.you;

        user.muted = !user.muted;

        this.trigger(this._users[id] ? {users: this._users} : { you: this._user.you });
    },

    _onConnectSuccess: function(response) {
        this._user = { logged: true, you: this._getNewUser() };

        _.merge(this._user.you, response.user, { current: true });

        this.trigger(this._user);

        return response.ws;
    },

    _subscribeWSEvents: function(socket) {
        socket.onmessage = this._onWsMessage.bind(this, socket);
    },

    _onWsMessage: function(socket, message) {
        var data = JSON.parse(message.data);

        switch (data.name) {
            case 'activeSpeaker':
                this._onActiveSpeaker(data);
                break;

            case 'muteState':
                this._onMuteState(data);
        }
    },

    _onActiveSpeaker: function(data) {
        var id = data.payload.user.id,
            currentUser = this._getUserById(id),
            currentSpeaker =
                this._users[this._activeSpeaker] ||
                (this._user.you.isActiveSpeaker && this._user.you) ||
                undefined;

        if (!currentUser.muted) {

            currentUser.isActiveSpeaker = true;
            this._activeSpeaker = id;

            if (currentSpeaker) {
                currentSpeaker.isActiveSpeaker = false;
            }

            this._assignAndTrigger(currentUser, id);

        }

    },

    _onMuteState: function(data) {
        var id = data.payload.user.id,
            currentUser = this._getUserById(id);

        currentUser.muted = data.payload.muted;

        if (currentUser.isActiveSpeaker && currentUser.muted) {

            currentUser.isActiveSpeaker = false;
            this._activeSpeaker = undefined;
        }

        this._assignAndTrigger(currentUser, id);
    },

    _assignAndTrigger: function(user, id) {

        if (!user.current) {

            this._users[id] = user;
            this.trigger({users: this._users});

        } else {

            this._user.you = user;
            this.trigger(this._user);
        }

    },

    _getUserById: function(id) {
        var user;

        if (id == this._user.you.id) {

            user = this._user.you;

        } else if (this._users[id]) {

            user = this._users[id];

        } else {

            user = this._getNewUser(id);
        }

        return user;
    },

    _getNewUser: function(id) {
        return {
            id: id,
            muted: false,
            isActiveSpeaker: false
        };
    },

    /**
     * Users storage { 1 : { id: 1, isActiveSpeaker: true, muted: false }}
     * @namespace
     * @type {Object}
     */
    _users: {},

    _user: {},

    _activeSpeaker: undefined

});

module.exports = AppStore;
