'use strict';

var currentSession,
    config = require('config');

var api = {

    /**
     * Open WebSoket connection
     * @public
     * @param {??}
     * @return {Object} WebSoket instance
     */
    connect: function(settings) {

        return currentSession ?
            this._getWS(currentSession) :
            this.createSession(settings).then(this._getWS);
    },


    _saveSession: function(response) {
        currentSession = undefined;

        if (response && response.status === 'ok') {
            currentSession = response.payload;
        }

        return currentSession;
    },

    /**
     * Send XHR to create new session
     * @public
     * @param {Object} settings - user data object
     * @param {String} settings.login - user login
     * @param {String} settings.password - user password
     * @return {Object} Promise
     */
    createSession: function(settings) {

        var session = new Promise(this._createHandler.bind(this, settings));

        session.then(this._saveSession);

        return session;
    },

    /**
     * Send XHR to mute user by ID
     * @public
     * @param {String} ID - user ID
     * @return {Object} Promise - run this.toggleStatus that returns Promise
     */
    mute: function(id) {

        return this.toggleStatus({
            id: id,
            isMuted: false
        });

    },

    /**
     * Send XHR to unmute user by ID
     * @public
     * @param {String} ID - user ID
     * @return {Object} Promise - run this.toggleStatus that returns Promise
     */
    unmute: function(id) {

        return this.toggleStatus({
            id: id,
            isMuted: true
        });

    },

    /**
     * Send XHR to toggle mute status
     * @public
     * @param {Object} settings - user data object
     * @param {String} settings.id - user id
     * @param {Boolean} settings.status - user current status
     * @return {Object} Promise
     */
    toggleStatus: function(settings) {
        return new Promise(this._toggleHandler.bind(this, settings));
    },

    _toggleHandler: function(settings, resolve, reject) {

        var url = config[settings.isMuted ? 'unmute' : 'mute'] + '/' + settings.id,
            xhr = this._getXHR(
                        'post',
                        url,
                        resolve,
                        reject
                    );

        xhr.send(JSON.stringify(settings));

        return xhr;

    },

    _createHandler: function(settings, resolve, reject) {

        var xhr = this._getXHR(
                        'post',
                        config.create,
                        resolve,
                        reject
                    );

        xhr.send(JSON.stringify(settings));

        return xhr;
    },

    _getWS: function() {

        return new Promise(function(resolve, reject) {
            var socket;

            if (!currentSession) {

                reject('No Session');

            } else {

                socket = new WebSocket(
                            currentSession.rtmUrl +
                            '/?token=' +
                            currentSession.token
                        );

                socket.onerror = function(e) {
                    reject(e);
                };

                socket.onopen = function(e) {
                    resolve({ user: currentSession.user, ws: this });
                };
            }
        });

    },

    _getXHR: function (method, url, resolve, reject) {

        var xhr = new XMLHttpRequest();

        xhr.timeout = config.timout || 0;

        xhr.open(method.toUpperCase(), url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {

            this.status == 200 ?
                resolve(JSON.parse(this.response)) :
                reject(this.statusText);
        };

        xhr.ontimeout = function() {
            reject('Timeout in ' + this.config.timeout + 'ms reached' );
        };

        xhr.onerror = function(e) {
            reject(new Error(this.statusText || 'Request error'));
        };

        xhr.onabort = function() {
            reject(new Error('Request aborted'));
        };

        return xhr;
    }
};

module.exports = api;
