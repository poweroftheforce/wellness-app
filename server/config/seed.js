/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Template from '../api/template/template.model';
import User from '../api/user/user.model';
import Plan from '../api/plan/plan.model';

Plan.find({}).removeAsync()
  .then(() => {
    console.log('finished clearing plans');
  });

Template.find({}).removeAsync()
  .then(() => {
    Template.create({
      version: '0.0',
      author: 'System',
      sections: [
        {
          name: 'Front Cover',
          order: 1,
          cover_page: '',
          html: 'Cover Page'
        },
        {
          name: 'Table Of Contents',
          order: 2,
          cover_page: '',
          html: 'ToC'
        },
        {
          name: 'Introduction to Wellness',
          order: 3,
          cover_page: '',
          html: 'Intro to Wellne'
        }
      ]
    })
    .then(() => {
      console.log('finished populating templates');
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'jdoe1'
    }, {
      provider: 'local',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'jdoe1'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Justin Rhyne',
      email: 'justin@example.com',
      password: 'justin'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
