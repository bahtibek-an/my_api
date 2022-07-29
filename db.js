import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);