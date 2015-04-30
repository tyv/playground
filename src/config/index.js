var HTTP_PROTOCOL = 'http://',
    HOST = '107.170.105.13',
    API_URL = '/api',

    api = HTTP_PROTOCOL + HOST + API_URL,
    session = api + '/session';

module.exports = {
    api: api,
    session: session,

    create: session + '/join',
    mute: api + '/mute',
    unmute: api + '/unmute',

    timeout: 5000,
    attempts: 5
};
