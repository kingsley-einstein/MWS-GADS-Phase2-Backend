import {Router} from 'express';
import {AuthController} from '../controllers';
import {Auth} from '../middlewares';

const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.signIn);
router.patch('/auth/update', Auth.verifyToken, AuthController.updateItem);
router.post('/auth/logout', Auth.verifyToken, AuthController.logOut);
router.get('/auth', Auth.verifyToken, AuthController.getAuthUser);

export default router;
