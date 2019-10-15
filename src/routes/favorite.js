import {Router} from 'express';
import {FavoriteController} from '../controllers';
import {Auth} from '../middlewares';

const router = Router();

router.post('/favorite', Auth.verifyToken, FavoriteController.create);
router.get('/favorite', Auth.verifyToken, FavoriteController.getFavorites);
router.delete('/favorite/:id', Auth.verifyToken, FavoriteController.deleteOne);
router.delete('/favorites', Auth.verifyToken, FavoriteController.deleteAll);

export default router;
