/* global describe, beforeEach, expect, it, inject */

'use strict';

describe('service', function() {
  // load modules
  beforeEach(module('app'));
  beforeEach(module('appServices'));

  // Test service availability
  it('check the existence of card factory', inject(function(websocketService) {
    expect(websocketService).toBeDefined();
  }));
});
