import { GraphQLServer, } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: 123098,
                name: 'J',
                email: 'some email',
                age: 23
            };
        },
        post() {
            return {
                id: 1111,
                title: 'Some Post',
                body: 'Some posts body',
                published: false,
            };
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