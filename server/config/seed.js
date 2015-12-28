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
          html: 'Into To Wellness'
        },
        {
          name: 'Custom Wellness',
          order: 4,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Wellness Summary',
          order: 5,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: '5 Points Primer',
          order: 6,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Nutrition',
          order: 7,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Exercise',
          order: 8,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Hormones',
          order: 9,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Inflamation',
          order: 10,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Detoxification',
          order: 11,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Neutraceuticals',
          order: 12,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Prescriptions',
          order: 13,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Compounding Pharmacy List',
          order: 14,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Drug-Nutrient Reactions',
          order: 15,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Drug To Drug Interactions',
          order: 16,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Objective Measures',
          order: 17,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Supplement Store',
          order: 18,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Wellness Coach Program',
          order: 19,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Upcoming Events',
          order: 20,
          cover_page: '',
          html: 'BODY_OF_SECTION'
        },
        {
          name: 'Social Media',
          order: 21,
          cover_page: '',
          html: 'BODY_OF_SECTION'
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
