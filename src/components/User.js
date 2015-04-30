'use strict';

var React = require('react/addons');
var AppActions = require('actions/AppActionCreators');

var User = React.createClass({

    render: function() {
        var className = 'user' + ' ' +
                            'user_muted_' + this.props.muted + ' ' +
                            'user_active_' + this.props.activeSpeaker;

        return (
          <li className={className}>

                {this.props.author ?
                    'You: ' + this.props.name :
                    'User #' + this.props.userId
                }

                <button className="button" onClick={ this.toggle }>toggle</button>

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
