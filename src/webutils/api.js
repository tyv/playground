'use strict';

var currentSession,
    config = require('config');

var api = {

    /**
     * If current session: Open WebSoket connection,
     * create new session and open WebSoket if not
     * @public
     * @async
     * @param {Object} settings - user data object
     * @param {String} settings.login - user login
     * @param {String} settings.password - user password
     * @param {Number} settings.attempts - number of xhr retry
     * @param {Number} settings.timeout -  xhr timeout in ms
     * @return {Object} Promise
     */
    connect: function(settings) {

        return currentSession ?
            this._getWS(currentSession) :
            this.createSession(settings).then(this._getWS);
    },

    /**
     * Send XHR to create new session and save session
     * @public
     * @async
     * @param {Object} settings - user data object
     * @param {String} settings.login - user login
     * @param {String} settings.password - user password
     * @param {Number} settings.attempts - number of xhr retry
     * @param {Number} settings.timeout -  xhr timeout in ms
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
     * @async
     * @param {String|Number} ID - user ID
     * @return {Object} Promise
     */
    mute: function(id) {

        return this.toggleStatus({
            id: id,
            muted: false
        });

    },

    /**
     * Send XHR to unmute user by ID
     * @public
     * @async
     * @param {String|Number} ID - user ID
     * @return {Object} Promise
     */
    unmute: function(id) {

        return this.toggleStatus({
            id: id,
            muted: true
        });

    },

    /**
     * Send XHR to toggle mute status
     * @public
     * @async
     * @param {Object} settings - user data object
     * @param {String|Number} settings.id - user id
     * @param {Boolean} settings.status - user current status
     * @param {Number} settings.attempts - number of xhr retry
     * @param {Number} settings.timeout -  xhr timeout in ms
     * @return {Object} Promise
     */
    toggleStatus: function(settings) {
        return new Promise(this._toggleHandler.bind(this, settings));
    },

    /**
     * Save current session in closure
     * @private
     * @param  {Object} response API response object from session/join post method
     * @return {Object} Current session
     */
    _saveSession: function(response) {

        currentSession = undefined;

        if (response && response.status === 'ok') {
            currentSession = response.payload;
        }

        return currentSession;
    },

    /**
     * Configure and return XHR for toggle mute status
     * @private
     * @param {Object} settings - user data object
     * @param {String|Number} settings.id - user id
     * @param {Boolean} settings.status - user current status
     * @param  {Function} resolve  Resolve handler
     * @param  {Function} reject   Reject handler
     * @return {Object}          XHR
     */
    _toggleHandler: function(settings, resolve, reject) {

        var url = config[settings.muted ? 'unmute' : 'mute'] + '/' + settings.id;

        if (!currentSession) {
            return reject('No Session');
        }

        return this._getXHR(
            'put',
            url,
            JSON.stringify({ token: currentSession.token }),
            resolve,
            reject,
            settings.attempts,
            settings.timeout
        );

    },

    /**
     * Configure and return XHR for create session
     * @private
     * @param {Object} settings - user data object
     * @param {String} settings.login - user login
     * @param {String} settings.password - user password
     * @param {Number} settings.attempts - number of xhr retry
     * @param {Number} settings.timeout -  xhr timeout in ms
     * @param  {Function} resolve  Resolve handler
     * @param  {Function} reject   Reject handler
     * @return {Object}          XHR
     */
    _createHandler: function(settings, resolve, reject) {

        var xhr = this._getXHR(
                        'post',
                        config.create,
                        JSON.stringify(settings),
                        resolve,
                        reject,
                        settings.attempts,
                        settings.timeout
                    );

        return xhr;
    },

    /**
     * Return new WebSoket Connection
     * @async
     * @private
     * @return {Object} Promise
     */
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

    /**
     * Create and return new XHR object with attached event handlers,
     * sends data, handle retries, attach resolve and reject handlers.
     * @private
     * @async
     * @param  {String} method  XHR method
     * @param  {String} url     XHR url
     * @param  {String} data    JSON data for sending as string
     * @param  {Function} resolve Resolve handler
     * @param  {Function} reject  Reject handler
     * @param  {Number} attempts number of XHR retry
     * @param  {Number} timeout XHR timeout
     * @return {Object}         XHR instance
     */
    _getXHR: function (method, url, data, resolve, reject, retries, timeout) {

        var xhr,
            attempts = retries || config.attempts;

        function getXHR() {
            console.log('attempts', attempts);

            xhr = new XMLHttpRequest();

            xhr.timeout = timeout || config.timout || 0;

            xhr.open(method.toUpperCase(), url);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {

                var res;

                try {
                    res = JSON.parse(this.response);
                } catch(e) {
                    res = this.response;
                }

                if (this.status === 200 && res.status === 'ok') {

                    resolve(res);

                } else {

                    attempts--;
                    if (attempts <= 0) {

                        reject(new Error(res.error || this.statusText || 'Request error') );

                    } else {
                        console.log('RETRY');
                        getXHR();
                    }
                }
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

            xhr.send(data);

            return xhr;
        }

        return getXHR();
    }
};

module.exports = api;
