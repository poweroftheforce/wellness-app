/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/predefinedMaterials', require('./api/predefinedMaterial'));
  app.use('/api/nutraceuticals', require('./api/nutraceutical'));
  app.use('/api/references', require('./api/reference'));
  app.use('/api/prescriptions', require('./api/prescription'));
  app.use('/api/plans', require('./api/plan'));
  app.use('/api/plans/:plan_id/sections', require('./api/plan/planSection'));
  app.use('/api/templates', require('./api/template'));
  app.use('/api/templates/:template_id/sections', require('./api/template/templateSection'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
