import { GraphQLServer, } from 'graphql-yoga';

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        title() {
            return 'Football';
        },  
        price() {
            return 19.99;
        },
        releaseYear() {
            return null;
        },
        rating() {
            return null;
        },
        inStock() {
            return true;
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