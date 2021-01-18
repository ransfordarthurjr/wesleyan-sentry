import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import path from 'path';
//import { DBRoutes } from './src/routes/api/db';
import { Routes } from './src/routes/routes';
import { typeDefs } from './src/graphql/types-defs';
import { resolvers } from './src/graphql/resolvers';
import { prisma } from './src/prisma/prisma';

// instance of express
const PORT = process.env.PORT || 8000;
const server: express.Application = express();

// cors whitelist
const corsWhitelist = [Routes.FRONT_END_URL, Routes.APOLLO_GRAPHQL_STUDIO];
// cors
const corsOptions: cors.CorsOptions = {
    /*allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],*/
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin: corsWhitelist,
    preflightContinue: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
server.use(cors(corsOptions));

// static folder
server.use(express.static(path.join(__dirname, 'public')));

// instance of apollo server
const apollo = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: {
        prisma,
    },
});
// apply express server to apollo server
apollo.applyMiddleware({ app: server, path: '/graphql', cors: corsOptions });

// db apis removed in favour of graphql
//const dbRoutes: DBRoutes = new DBRoutes();
//server.use(DBRoutes.ENPOINT, dbRoutes.router);

// listen
server.listen(PORT, () => {
    console.log(`Server ⚡️ is listening on port: ${PORT}`);
});
