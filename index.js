import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import sequelize from "./db.js";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import graphqlResolver from "./resolver/index.js"
import User from "./models/models.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(cors());
app.use(express.json());

const schema = makeExecutableSchema({
    typeDefs: loadSchemaSync('schema/**/*.graphql', {
        loaders: [new GraphQLFileLoader()],
    }),
    resolvers: graphqlResolver,
});


app.use("/graphql", graphqlHTTP({
    graphiql: process.env.NODE_ENV === "development",
    schema,
}))

// https://www.breakingbadapi.com/api/quotes

// app.get("/", (req, res) => {
//     res.json({message: "work"})
// })
app.use("/api", routes);


app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server has been started on PORT ${PORT}`);
        })    
    } catch (error) {
        console.lod(error);
    }
})()