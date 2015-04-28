'use strict';

var React = require('react/addons');

var User = React.createClass({

    render: function() {
        var className = 'user' + ' ' +
                            'user_muted_' + this.props.muted + ' ' +
                            'user_active_' + this.props.activeSpeaker;

        return (
          <div className={className}>{this.props.name}</div>
        );
    }
});

module.exports = User;
