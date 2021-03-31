import express from 'express';
import http from 'http';
import https from 'https';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
//import { DBRoutes } from './src/routes/api/db';
import { Routes } from './src/routes/routes';
import { typeDefs } from './src/graphql/types-defs';
import { resolvers } from './src/graphql/resolvers';
import { prisma } from './src/prisma/prisma';
import fs from 'fs';

// environment variables
const PORT = process.env.PORT || 8000;
const PORT_HTTPS = process.env.PORT || 8443;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// setup express
const server: express.Application = express();
const httpServer = http.createServer(server);
const httpsServer = https.createServer(
    {
        key: fs.readFileSync(
            '/Users/ransfordarthurjr/Documents/Foundary/certs/node-ssl/key.pem'
        ),
        cert: fs.readFileSync(
            '/Users/ransfordarthurjr/Documents/Foundary/certs/node-ssl/cert.pem'
        ),
    },
    server
);

// helmet security
server.use(helmet());

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
    methods: 'GET,POST',
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
httpServer.listen(PORT, () => {
    console.log(`Server ⚡️ is listening on port: ${PORT}`);
});
/*httpsServer.listen(PORT_HTTPS, () => {
    console.log(`Server ⚡️ is listening on port: ${PORT_HTTPS}`);
});*/
