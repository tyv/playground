'use strict';

var React = require('react/addons');
var AppActions = require('actions/AppActionCreators');

var User = React.createClass({

    render: function() {
        var className = 'user' + ' ' +
                            (this.props.author ? 'user_you ' : '') +
                            'user_muted_' + this.props.muted + ' ' +
                            'user_active_' + this.props.activeSpeaker;

        return (
          <li className={className}>
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                {this.props.author ?
                    'You: ' + this.props.name :
                    'User #' + this.props.userId
                }

                <button className="btn btn-default" onClick={ this.toggle }>
                    <span className="glyphicon glyphicon-volume-off" aria-hidden="true"></span>
                    <span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span>
                </button>

          </li>
        );
    },

    toggle: function() {

        AppActions.toggle({
            id: this.props.userId,
            muted: this.props.muted
        });
    }
});

module.exports = User;
