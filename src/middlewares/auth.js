import db from '../db';
import env from '../env';
import {Jwt} from '../helpers';

const {
  models: {
    User,
    Blacklist
  }
} = db;

/**
 * @author Kingsley Victor
 */
export class Auth {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   */
  static verifyToken = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
      res.status(401).json({
        status: 401,
        error: 'Authorization header not presnt in request'
      });
      return;
    }
    const auth = authorization.split(' ');
    if (auth[0] !== 'Bearer') {
      res.status(401).json({
        status: 401,
        error: `Authorization must be of type 'Bearer'`
      });
      return;
    }
    const isValid = await new Promise((resolve) => {
      Jwt.verify(auth[1], env.jwt_secret, (err, decoded) => {
        resolve(decoded);
      });
    });
    if (!isValid) {
      res.status(401).json({
        status: 401,
        error: 'Invalid token or expired session'
      });
      return;
    }
    const isBlacklisted = await new Promise((resolve) => {
      Blacklist.findByToken(auth[1]).then((loggedOut) => {
        resolve(loggedOut);
      });
    });
    if (isBlacklisted) {
      res.status(401).json({
        status: 401,
        error: 'Only logged in users can access this resource'
      });
      return;
    }
    const decoded = Jwt.decode(auth[1]);
    const user = await new Promise((resolve) => {
      User.findByPk(decoded.id).then((authenticated) => {
        resolve(authenticated);
      });
    });
    if (user) {
      req.user = user;
      req.token = auth[1];
      next();
    } else {
      res.status(401).json({
        status: 401,
        error: 'User not recognized'
      });
    }
  }
}
