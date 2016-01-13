'use strict';

import {Router} from 'express';
import * as controller from './template.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.get('/latest', controller.latest);          
router.get('/:id', controller.show);
router.post('/', controller.create);				
router.put('/:id', controller.update);			
router.patch('/:id', controller.update);		
router.delete('/:id', controller.destroy);	

export default router;
