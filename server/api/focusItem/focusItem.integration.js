'use strict';

var app = require('../..');
import request from 'supertest';

var newFocusItem;

describe('FocusItem API:', function() {

  describe('GET /api/focusItems', function() {
    var focusItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/focusItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          focusItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      focusItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/focusItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/focusItems')
        .send({
          name: 'New FocusItem',
          info: 'This is the brand new focusItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFocusItem = res.body;
          done();
        });
    });

    it('should respond with the newly created focusItem', function() {
      newFocusItem.name.should.equal('New FocusItem');
      newFocusItem.info.should.equal('This is the brand new focusItem!!!');
    });

  });

  describe('GET /api/focusItems/:id', function() {
    var focusItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/focusItems/' + newFocusItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          focusItem = res.body;
          done();
        });
    });

    afterEach(function() {
      focusItem = {};
    });

    it('should respond with the requested focusItem', function() {
      focusItem.name.should.equal('New FocusItem');
      focusItem.info.should.equal('This is the brand new focusItem!!!');
    });

  });

  describe('PUT /api/focusItems/:id', function() {
    var updatedFocusItem;

    beforeEach(function(done) {
      request(app)
        .put('/api/focusItems/' + newFocusItem._id)
        .send({
          name: 'Updated FocusItem',
          info: 'This is the updated focusItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFocusItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFocusItem = {};
    });

    it('should respond with the updated focusItem', function() {
      updatedFocusItem.name.should.equal('Updated FocusItem');
      updatedFocusItem.info.should.equal('This is the updated focusItem!!!');
    });

  });

  describe('DELETE /api/focusItems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/focusItems/' + newFocusItem._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when focusItem does not exist', function(done) {
      request(app)
        .delete('/api/focusItems/' + newFocusItem._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
