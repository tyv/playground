# Global





* * *

### connect(settings, settings.login, settings.password, settings.attempts, settings.timeout) 

If current session: Open WebSoket connection,
create new session and open WebSoket if not

**Parameters**

**settings**: `Object`, user data object

**settings.login**: `String`, user login

**settings.password**: `String`, user password

**settings.attempts**: `Number`, number of xhr retry

**settings.timeout**: `Number`, xhr timeout in ms

**Returns**: `Object`, Promise


### createSession(settings, settings.login, settings.password, settings.attempts, settings.timeout) 

Send XHR to create new session and save session

**Parameters**

**settings**: `Object`, user data object

**settings.login**: `String`, user login

**settings.password**: `String`, user password

**settings.attempts**: `Number`, number of xhr retry

**settings.timeout**: `Number`, xhr timeout in ms

**Returns**: `Object`, Promise


### mute(ID) 

Send XHR to mute user by ID

**Parameters**

**ID**: `String | Number`, user ID

**Returns**: `Object`, Promise


### unmute(ID) 

Send XHR to unmute user by ID

**Parameters**

**ID**: `String | Number`, user ID

**Returns**: `Object`, Promise


### toggleStatus(settings, settings.id, settings.status, settings.attempts, settings.timeout) 

Send XHR to toggle mute status

**Parameters**

**settings**: `Object`, user data object

**settings.id**: `String | Number`, user id

**settings.status**: `Boolean`, user current status

**settings.attempts**: `Number`, number of xhr retry

**settings.timeout**: `Number`, xhr timeout in ms

**Returns**: `Object`, Promise



* * *










