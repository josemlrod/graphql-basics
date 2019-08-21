import { GraphQLServer, } from 'graphql-yoga';

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query';
        },
        name() {
            return '[Your name]';
        },
        location() {
            return 'New York City';
        },
        bio() {
            return 'Something about yourself';
        },
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(_ => {
    console.log('Running...')
});