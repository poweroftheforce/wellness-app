/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var AboutPage = function() {
  this.conTitle = element(by.css('.content-title'));
  this.h1El = this.conTitle.element(by.css('h1'));
  this.head = element(by.css('.page-head'));
  this.logo = this.head.element(by.css('.logo'));
};

module.exports = new AboutPage();

