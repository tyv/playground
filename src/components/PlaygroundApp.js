'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var AppStore = require('stores/AppStore');

var User = require('./User');
var LoginForm = require('./LoginForm');

var you = [{ id: '123', name: 'Yuri Tkachenko', }];

var PlaygroundApp = React.createClass({

    mixins: [Reflux.connect(AppStore)],

    getInitialState: function() {
        return { users: [], logged: false };
    },

    render: function() {
        var result;

        if (this.state.logged) {
            result = (<div className='chatroom'>
                {this.state.users.map(function(user) {
                    return <User
                        muted={user.muted}
                        name={user.id}
                        activeSpeaker={user.isActiveSpeaker}/>;
                })}
              </div>);
        } else {
            result = (
                <div className="login">
                    <LoginForm/>
                </div>
            );
        }

        return result;
    }
});

module.exports = PlaygroundApp;
