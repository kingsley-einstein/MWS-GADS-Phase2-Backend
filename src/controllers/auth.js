import bcrypt from 'bcryptjs';
import db from '../db';
import {Jwt} from '../helpers';
import env from '../env';

const {
  models: {
    User,
    Blacklist
  }
} = db;

/**
 * @author Kingsley Victor
 */
export class AuthController {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  static register = async (req, res) => {
    try {
      const {body} = req;
      const user = await User.create(body);
      const data = {
        email: user.email,
        token: Jwt.tokenize({
          id: user.id,
          password: user.password
        }, env.jwt_secret)
      };
      res.status(201).json({
        status: 201,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  static signIn = async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findByEmail(email);
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({
          status: 400,
          error: 'Incorrect password'
        });
        return;
      }
      const data = {
        email: user.email,
        token: Jwt.tokenize({
          id: user.id,
          password: user.password
        }, env.jwt_secret)
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   *
   */
  static updateItem = async (req, res) => {
    try {
      const {user, body} = req;
      const updated = await User.update(body, {
        where: {
          id: user.id
        },
        individualHooks: true,
        returning: true
      });
      const data = {
        id: updated[1][0].id,
        email: updated[1][0].email
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  static logOut = async (req, res) => {
    try {
      const {user, token} = req;
      const details = await Blacklist.create({token});
      const data = {
        message: `Successfully signed out user with email ${user.email}`,
        details
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  static getAuthUser = async (req, res) => {
    try {
      const {user} = req;
      const data = {
        id: user.id,
        email: user.email
      };
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}
