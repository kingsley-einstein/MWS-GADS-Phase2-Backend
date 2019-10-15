import {Router} from 'express';
import AuthRouter from './auth';
import FavoriteRouter from './favorite';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the MWS-GADS-Phase2 challenge API'
  });
});

router.use('/', AuthRouter);
router.use('/', FavoriteRouter);

export default router;
