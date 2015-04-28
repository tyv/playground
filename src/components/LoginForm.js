'use strict';

var React = require('react/addons');
var AppActions = require('actions/AppActionCreators');

var LoginForm = React.createClass({
    getInitialState: function() {
        return {
            login: '',
            password: ''
        };
    },

    render: function() {
        return (
            <form action="" onSubmit={this.onSubmit}>
                <div>
                    <input
                        onChange={this.onChange}
                        placeholder="username"
                        value={this.state.login}/>
                </div>
                <div>
                    <input
                        onChange={this.onChange}
                        type="password"
                        placeholder="password"
                        value={this.state.password}/>
                </div>
                <button type="submit">Login me</button>
            </form>
        );
    },

    onChange: function(e) {
        var target = e.target,
            state = {};

        state[target.type === 'password' ? 'password' : 'login'] = target.value;

        this.setState(state);
    },

    onSubmit: function(e) {
        e.preventDefault();
        AppActions.connect(this.state);
    }
});

module.exports = LoginForm;
