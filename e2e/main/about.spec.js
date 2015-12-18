'use strict';

var config = browser.params;

describe('About View', function() {
  var page;

  beforeEach(function() {
    let promise = browser.get(config.baseUrl + '/about');
    page = require('./about.po');
    return promise;
  });

  it('should include correct page title', function() {
    page.h1El.getText().should.eventually.equal('About Us');
  });

  it('should display seasons logo', function() {
    page.logo.getAttribute('src').should.eventually.match(/seasons-logo-green.png$/);
    page.logo.getAttribute('alt').should.eventually.equal('Seasons Wellness');
  });


   
});
