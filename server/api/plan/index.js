'use strict';

import {Router} from 'express';
import * as controller from './plan.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

// Need to attach user to the request to make sure to only get their own plans!
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

export default router;
