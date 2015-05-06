'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var AppStore = require('stores/AppStore');

var User = require('./User');
var LoginForm = require('./LoginForm');

var PlaygroundApp = React.createClass({

    mixins: [Reflux.connect(AppStore)],

    getInitialState: function() {
        return {
            logged: false
        };
    },

    render: function() {
        var result, users;


        if (this.state.logged) {
            users = this.state.users || {};

            result = (
                    <div className='chatroom'>

                        <input type="checkbox" className="hide__cb" id="hide-muted"/>
                        <label className="hide__l" htmlFor="hide-muted">Hide muted users</label>

                        <ul className="users">
                            <User
                                author={true}
                                muted={this.state.you.muted}
                                name={this.state.you.name}
                                activeSpeaker={this.state.you.isActiveSpeaker}
                                userId={this.state.you.id}
                                token={this.state.you.token} />

                            {Object.keys(users).map(function(id) {

                                return <User
                                    muted={users[id].muted}
                                    name={users[id].id}
                                    activeSpeaker={users[id].isActiveSpeaker}
                                    userId={users[id].id}/>;
                            })}
                        </ul>
                  </div>
              );
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
