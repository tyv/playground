'use strict';

describe('PlaygroundApp', function () {
  var React = require('react/addons');
  var PlaygroundApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    PlaygroundApp = require('components/PlaygroundApp.js');
    component = React.createElement(PlaygroundApp);
  });

  it('should create a new instance of PlaygroundApp', function () {
    expect(component).toBeDefined();
  });
});
