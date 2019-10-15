import jwt from 'jsonwebtoken';

/**
 * @author Kingsley Victor
 */
export class Jwt {
  /**
   * @param {string | object | Buffer} payload
   * @param {string} secret
   * @return {string} Returns a json web token
   */
  static tokenize = (payload, secret) => jwt.sign(payload, secret, {
    expiresIn: '3d'
  });

  /**
   * @param {string} token
   * @return {string | {}} Returns the payload
   */
  static decode = (token) => jwt.decode(token);

  /**
   * @param {string} token
   * @param {string} secret
   * @param {function} cb
   * @return {*}
   */
  static verify = (token, secret, cb) => jwt.verify(token, secret, null, cb);
}
