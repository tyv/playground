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
            <form className="login" action="" onSubmit={this.onSubmit}>

                <div className="input-group input-group-lg login__line">
                  <span className="input-group-addon" id="sizing-addon1">
                        <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  </span>
                  <input
                    onChange={this.onChange}
                    value={this.state.login}
                    autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Username"/>
                </div>

                <div className="input-group input-group-lg login__line">
                  <span className="input-group-addon" id="sizing-addon1">
                        <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                  </span>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    className="form-control"
                    placeholder="Password"/>
                </div>

                <div className="login__line">
                    <button className="btn btn-lg btn-primary" type="submit">Login me</button>
                </div>
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
