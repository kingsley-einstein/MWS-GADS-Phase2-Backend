import {cors} from '../middlewares';
import MainRouter from '../routes';

export default (app, {json, urlencoded}) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    app.use(require('morgan')('dev'));
  }
  app.use(cors('*'));
  app.options('*', cors('*'));
  app.use(json());
  app.use(urlencoded({
    extended: true
  }));
  app.use('/api/v1', MainRouter);
};
