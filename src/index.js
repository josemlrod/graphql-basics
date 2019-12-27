import { GraphQLServer, } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Prediction from './resolvers/Prediction';
import prisma from './prisma';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query, 
        Mutation,
        User,
        Prediction
    },
    context: {
        db,
        prisma
    },
});

server.start(_ => {
    console.log('Running...')
});