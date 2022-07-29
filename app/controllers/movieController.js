import Movie from "../../models/movieModels.js";
import ApiError from './../../error/ApiError.js';

class MovieController {
    async getAll(req, res) {
        try {
            let {limit, page} = req.query;
            page = page || 1; 
            limit = limit || 10;
            let offset = page * limit - limit;

            const movies = await Movie.findAndCountAll({ limit, offset });

            return res.json(movies);
        } catch (error) {
            return next(ApiError.internal(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;

            const movie = await Movie.findOne({where: {id}});

            if (!movie) {
                return next(ApiError.badRequest("Movie with this id doesn't exist"));
            }

            return res.json(movie);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async create(req, res) {
        try{
            const { quote, author } = req.body;

            const movie = await Movie.create({quote, author});

            return res.json(movie);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id, quote, author } = req.body;

            await Movie.update({quote, author}, {
                where: {id}
            })

            const movie = await Movie.findOne({where: {id}});

            if (!movie) {
                return next(ApiError.badRequest("Movie with this id doesn't exists"));
            }

            return res.json(movie);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async destroy(req, res, next) {
        try{
            const { id } = req.params;

            const movie = await Movie.findOne({where: {id}});

            if (!movie) {
                next(ApiError.badRequest("Movie with this id doesn't exists"));
            }

            await Movie.destroy({where: {id}})
            
            return res.json(movie);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

export default new MovieController;