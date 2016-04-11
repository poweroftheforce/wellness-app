'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.update);
// router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);

// Custom Routes
// router.post('/me/pharmacies', auth.isAuthenticated(), controller.addPharmacy);
// router.put('/me/pharmacies/:id', auth.isAuthenticated(), controller.removePharmacy);
// router.post('/me/stores', auth.isAuthenticated(), controller.addStore);
// router.put('/me/stores/:id', auth.isAuthenticated(), controller.removeStore);
// router.post('/me/networks', auth.isAuthenticated(), controller.addNetwork);
// router.put('/me/networks/:id', auth.isAuthenticated(), controller.removeNetwork);

export default router;
