import userResolvers from "./User.js";
import movieResolvers from './Movie.js';

const rootResolver = {};

const resolvers = [
    rootResolver,
    userResolvers,
    movieResolvers
];

export default resolvers;