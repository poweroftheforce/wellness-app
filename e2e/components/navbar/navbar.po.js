/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var NavbarComponent = function() {
  this.navbar = element(by.css('.navbar'));
  this.navbarHeader = this.navbar.element(by.css('.navbar-header'));
  this.navbarNav = this.navbar.element(by.css('#navbar-main .nav.navbar-nav'));
  this.navbarMyAccountDropdown = this.navbarNav.element(by.css('.my-account-link'));
  this.navbarAdminDropdown = this.navbarNav.element(by.css('.admin-link'));
};

module.exports = new NavbarComponent();
