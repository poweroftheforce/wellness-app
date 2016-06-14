/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiTemplateTemplateModel = require('../api/template/template.model');

var _apiTemplateTemplateModel2 = _interopRequireDefault(_apiTemplateTemplateModel);

var _apiTemplateTemplateSectionTemplateSectionModel = require('../api/template/templateSection/templateSection.model');

var _apiTemplateTemplateSectionTemplateSectionModel2 = _interopRequireDefault(_apiTemplateTemplateSectionTemplateSectionModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

var _apiPlanPlanModel = require('../api/plan/plan.model');

var _apiPlanPlanModel2 = _interopRequireDefault(_apiPlanPlanModel);

var template, section;

_apiPlanPlanModel2['default'].find({}).removeAsync().then(function () {
  console.log('finished clearing plans');
});

_apiTemplateTemplateModel2['default'].find({}).removeAsync().then(function () {
  _apiTemplateTemplateModel2['default'].create({
    version: '0.1',
    author: 'System'
  }).then(function (data) {
    template = data;
    console.log('finished populating template');
    _apiTemplateTemplateSectionTemplateSectionModel2['default'].find({}).removeAsync().then(function () {
      _apiTemplateTemplateSectionTemplateSectionModel2['default'].createAsync({
        title: 'Front Cover',
        order: 1,
        cover_page: 'front-cover.jpg',
        html: '<h4>This is your wellness plan.</h4>',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Table Of Contents',
        order: 2,
        html: '<p><br/></p><p>1. Cover</p><p>2. ToC</p><p>3. Intro to Wellness</p><p>4. etc...</p><p>5. ...</p>',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Introduction to Wellness',
        order: 3,
        html: '<p style="text-align: left;">What is Wellness?  Wellness can mean so many different things to so many different people.  To some wellness, is a place to work out.  To others, wellness is an absence of disease.  Still, to others, wellness is a lifestyle.</p><p class="p2">Early philosophers and physicians saw the value of wellness.  Aristotle, a great philosopher said, “the whole is more than the sum of it’s parts”.  Hippocrates, considered by many as the father of western medicine said, “treat the body as a whole, rather than the sum of its parts”.<span class="s1"></span></p><p class="p2">Wellness is defined by the dictionary.reference.com as “the quality or state of being healthy in body and mind...” and “an approach to healthcare that emphasizes preventing illness and prolonging life, as opposed to emphasizing treating diseases”.<span class="s1"></span></p><p class="p2">At Seasons, we define wellness a little differently.  Wellness is the customized treatment plan that helps each individual achieve optimal health, prevent disease before it ever starts, and achieve optimal age in health.  Wellness is helping the individual to achieve optimal health to fight illness, prevent disease, and maximize longevity.<span class="s1"></span></p><p class="p2">Wellness is a lifestyle.  You must live wellness everyday.  Wellness must be as sure as each breath that you take.  You cannot think about wellness and be well.  Wellness must become second nature.   Wellness must become a habit.  Wellness just must be something that you do as a part of daily living.</p><p class="p1"><span class="s1">Wellness is a proactive daily journey, rather than a reactive patch lifestyle.<span class="Apple-converted-space">  </span>This journey is as different as the individual.<span class="Apple-converted-space">  </span>For journey will be very difficult, as they are in poor health.<span class="Apple-converted-space">  </span>For others, this journey will simply be a continuation of their current lifestyle.<span class="Apple-converted-space">  </span>The point is, the journey is unique for each individual.</span></p><p class="p1"><span class="s1">The lifestyle and the journey in wellness requires a commitment.<span class="Apple-converted-space">  </span>Just as there is no pill that provides weight loss, there is no pill that provides wellness.<span class="Apple-converted-space">  </span>At Seasons, we cannot make you well: with your commitment we can determine the path necessary for your journey into a lifestyle of wellness and the path to maintain wellness. <span class="Apple-converted-space"> </span></span></p><p class="p2">Wellness requires partners.  That is what your team at Seasons is.  We are your partners in Wellness.  We are not your partners in managing disease.  Whether you are struggling with disrupting symptoms or even disease, we are your partners to Wellness transformation.  In contrast, if you are healthy, we are you ongoing partners to maintain wellness.<span class="s1"></span></p><p class="p2">Wellness works with the body.  Wellness does not interfere with what the body does on a day to day basis.  Wellness should not have side effects, drug to drug interactions or complications.  By working with the body, balance is achieved.  This balance, whether it be nutrition, hormones...this balance brings wellness.  By working with the body, side effects are minimized, compliance is improved, and wellness is achieved.<span class="s1"></span></p><p class="p2">Most importantly, wellness honors our creator.  <br/><span class="s1"></span></p><p class="p2">We, at Seasons, look forward to your journey in wellness.  So, to your wellness to glorify our creator.</p><p class="p2"><span class="s1"></span></p>',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Custom Wellness',
        order: 4,
        html: '<p><br/></p><p>This plan is just for you.</p>',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Wellness Summary',
        order: 5,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: '5 Points Primer',
        order: 6,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Nutrition',
        order: 7,
        html: '',
        has_extras: true,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Exercise',
        order: 8,
        html: '',
        has_extras: true,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Hormones',
        order: 9,
        html: '',
        has_extras: true,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Inflamation',
        order: 10,
        html: '',
        has_extras: true,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Detoxification',
        order: 11,
        html: '',
        has_extras: true,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Neutraceuticals',
        order: 12,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Prescriptions',
        order: 13,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Compounding Pharmacy List',
        order: 14,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Drug-Nutrient Reactions',
        order: 15,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Drug To Drug Interactions',
        order: 16,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Objective Measures',
        order: 17,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Supplement Store',
        order: 18,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Wellness Coach Program',
        order: 19,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Upcoming Events',
        order: 20,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }, {
        title: 'Social Media',
        order: 21,
        html: '',
        has_extras: false,
        id_editable: false,
        _template_id: template._id
      }).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          section = data[i];
          template.sections.push(section);
        }
        template.save();
        console.log('finished populating sections');
      });
    });
  });
});

_apiUserUserModel2['default'].find({}).removeAsync().then(function () {
  _apiUserUserModel2['default'].createAsync({
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
  }).then(function () {
    console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
