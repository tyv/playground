'use strict';

var React = require('react/addons');

var User = React.createClass({

    render: function() {
        var className = 'user' + ' ' +
                            'user_muted_' + this.props.muted + ' ' +
                            'user_active_' + this.props.activeSpeaker;

        return (
          <li
            className={className}
            data-id={this.props.userId}
            data-token={this.props.token}>

                {this.props.author ?
                    'You: ' + this.props.name :
                    'User #' + this.props.userId
                }

          </li>
        );
    }
});

module.exports = User;
