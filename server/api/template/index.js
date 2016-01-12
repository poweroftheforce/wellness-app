'use strict';

import {Router} from 'express';
import * as controller from './template.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/latest', controller.latest);          
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);				
router.put('/:id', auth.hasRole('admin'), controller.update);			
router.patch('/:id', auth.hasRole('admin'), controller.update);		
router.delete('/:id', auth.hasRole('admin'), controller.destroy);	

export default router;
