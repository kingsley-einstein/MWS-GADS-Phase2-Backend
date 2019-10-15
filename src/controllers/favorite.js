import db from '../db';

const {
  models: {
    Favorite
  }
} = db;

/**
 * @author Kingsley Victor
 */
export class FavoriteController {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  static create = async (req, res) => {
    try {
      const {user, body} = req;
      const favorite = await Favorite.create({
        owner: user.id,
        movie_id: body.movie_id
      });
      const data = {
        message: 'Successfully added movie to favorites',
        favorite
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
  static getFavorites = async (req, res) => {
    try {
      const {user} = req;
      const data = await Favorite.findByOwner(user.id);
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
  static deleteOne = async (req, res) => {
    try {
      const {user, params: {
        id
      }} = req;
      const countDestroyed = await Favorite.destroy({
        where: {
          id,
          owner: user.id
        }
      });
      const data = `${countDestroyed} item deleted`;
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
  static deleteAll = async (req, res) => {
    try {
      const {user} = req;
      const countDestroyed = await Favorite.destroy({
        where: {
          owner: user.id
        }
      });
      const data = `${countDestroyed} items deleted`;
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
