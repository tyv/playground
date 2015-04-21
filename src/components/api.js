'use strict';

var config = require('./config');

var api = {

    /**
     * Send XHR to join to the session
     * @public
     * @param {Object} settings - user data object
     * @param {String} settings.password - user password
     * @return {Object} Promise
     */
    create: function(settings) {

        return new Promise(this._createHandler.bind(this, settings));
    },

    /**
     * Toggle 'mute' status
     */
    toggleStatus: function(id) {

    },



    _createHandler: function(settings, resolve, reject) {

        var xhr = this._getXHR(
                        'post',
                        config.api + 'session/join',
                        resolve,
                        reject
                    );

        xhr.send(JSON.stringify(settings));
    },

    _getXHR: function (method, url, resolve, reject) {

        var xhr = new XMLHttpRequest();

        xhr.timeout = config.timout || 0;

        xhr.open(method.toUpperCase(), url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {

            this.status == 200 ?
                resolve(this.response) :
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
