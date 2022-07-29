import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Movie = sequelize.define("movie", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quote: {type: DataTypes.STRING,},
    author: {type: DataTypes.STRING, },
})

export default Movie ;