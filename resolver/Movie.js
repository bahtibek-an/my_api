import movieController from "../app/controllers/movieController.js";
import Movie from './../models/movieModels.js';

const movieResolvers = {
    Query: {
        getAllMovies: async() => {
            return await Movie.findAll();
        },
        getMovie: async(parent, { id }) => {
            return await Movie.findOne({where: {id}});
        }
    },
    Mutation: {
        createMovie: async (parent, { input }) => {
            const {quote, author} = input;

            const movie = await Movie.create({quote, author});

            return movie;
        },
        editMovie: async (parent, { id, quote, author }) => {
            await Movie.update({quote, author}, {
                where: {id}
            })
    
            const movie = await Movie.findOne({where: {id}});
    
            if (!movie) {
                throw new Error("Movie with this id doesn't exists");
            }
    
            return movie;
        },
        deleteMovie: async (parent, { id }) => {
            const movie = await Movie.findOne({where: {id}});

            if (!movie) {
                throw new Error("Movie with this id doesn't exists");
            }
    
            await Movie.destroy({where: {id}})
            
            return movie;
        }
    },
}

export default movieResolvers;