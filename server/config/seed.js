/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Template from '../api/template/template.model';
import TemplateSection from '../api/template/templateSection/templateSection.model';
import User from '../api/user/user.model';
import Plan from '../api/plan/plan.model';

var template, section;

Plan.find({}).removeAsync()
  .then(() => {
    console.log('finished clearing plans');
  });

Template.find({}).removeAsync()
  .then(() => {
    Template.create({
      version: '0.1',
      author: 'System'
    })
    .then((data) => {
      template = data;
      console.log('finished populating template');
      TemplateSection.find({}).removeAsync()
        .then(() => {
          TemplateSection.createAsync(
            {
              title: 'Front Cover',
              order: 1,
              cover_page: 'front-cover.jpg',
              html: '<h2>Cover Page</h2>',
              _template_version: '0.1'
            },
            {
              title: 'Table Of Contents',
              _template_version: '0.1'
            },
            {
              title: 'Introduction to Wellness',
              _template_version: '0.1'
            },
            {
              title: 'Custom Wellness',
              _template_version: '0.1'
            },
            {
              title: 'Wellness Summary',
              _template_version: '0.1'
            },
            {
              title: '5 Points Primer',
              _template_version: '0.1'
            },
            {
              title: 'Nutrition',
              _template_version: '0.1'
            },
            {
              title: 'Exercise',
              _template_version: '0.1'
            },
            {
              title: 'Hormones',
              _template_version: '0.1'
            },
            {
              title: 'Inflamation',
              _template_version: '0.1'
            },
            {
              title: 'Detoxification',
              _template_version: '0.1'
            },
            {
              title: 'Neutraceuticals',
              _template_version: '0.1'
            },
            {
              title: 'Prescriptions',
              _template_version: '0.1'
            },
            {
              title: 'Compounding Pharmacy List',
              _template_version: '0.1'
            },
            {
              title: 'Drug-Nutrient Reactions',
              _template_version: '0.1'
            },
            {
              title: 'Drug To Drug Interactions',
              _template_version: '0.1'
            },
            {
              title: 'Objective Measures',
              _template_version: '0.1'
            },
            {
              title: 'Supplement Store',
              _template_version: '0.1'
            },
            {
              title: 'Wellness Coach Program',
              _template_version: '0.1'
            },
            {
              title: 'Upcoming Events',
              _template_version: '0.1'
            },
            {
              title: 'Social Media',
              _template_version: '0.1'
            })
          .then((data) => {
            for ( var i =0; i<data.length; i ++) {
              section = data[i];
              template.sections.push(section);
            }
            template.save();
            console.log('finished populating sections');
          });
        });
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
