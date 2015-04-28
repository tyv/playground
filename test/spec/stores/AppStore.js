'use strict';

describe('AppStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/AppStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
