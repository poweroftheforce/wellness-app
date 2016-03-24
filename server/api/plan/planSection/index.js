'use strict';

import {Router} from 'express';
import * as controller from './planSection.controller';
import * as auth from '../../../auth/auth.service';

var router = new Router({mergeParams: true});

router.get('/', auth.isAuthenticated(),  controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/:id', controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/focusItems', auth.isAuthenticated(), controller.removeFocusItems);
router.patch('/:id/focusItems', auth.isAuthenticated(), controller.removeFocusItems);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

export default router;
