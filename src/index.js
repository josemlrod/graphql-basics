import { GraphQLServer, } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
    // resolvers arguments: parent, args, ctx, info
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name) {
                return `Hello, ${args.name}`;
            } else {
                return `Hello!`;
            };
        },
        add(parent, args, ctx, info) {
            const { numbers, } = args;
            if (!numbers.length) {
                return 0;
            } else {
                return numbers.reduce((acc, e) => {
                    return acc += e;
                }, 0);
            };
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93];
        },
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