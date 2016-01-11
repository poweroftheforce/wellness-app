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
      version: '0.1',
      author: 'System',
      sections: [
        {
          name: 'Front Cover',
          order: 1,
          cover_page: 'front-cover.jpg',
          html: '<p>Cover Page</p>'
        },
        {
          name: 'Table Of Contents',
          order: 2,
          cover_page: '',
          html: '<p>ToC</p>'
        },
        {
          name: 'Introduction to Wellness',
          order: 3,
          cover_page: '',
          html: '<p class="red">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Custom Wellness',
          order: 4,
          cover_page: '',
          html: '<p class="blue">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Wellness Summary',
          order: 5,
          cover_page: '',
          html: '<p class="green">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: '5 Points Primer',
          order: 6,
          cover_page: '',
          html: '<p class="red">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Nutrition',
          order: 7,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Exercise',
          order: 8,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Hormones',
          order: 9,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Inflamation',
          order: 10,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Detoxification',
          order: 11,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Neutraceuticals',
          order: 12,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Prescriptions',
          order: 13,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Compounding Pharmacy List',
          order: 14,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Drug-Nutrient Reactions',
          order: 15,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Drug To Drug Interactions',
          order: 16,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Objective Measures',
          order: 17,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Supplement Store',
          order: 18,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Wellness Coach Program',
          order: 19,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Upcoming Events',
          order: 20,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
        },
        {
          name: 'Social Media',
          order: 21,
          cover_page: '',
          html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ullam deserunt possimus eveniet, quasi commodi similique! Ipsa, natus doloremque voluptatem error reprehenderit saepe voluptatum quaerat, sunt odio eaque harum delectus? </p>'
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
