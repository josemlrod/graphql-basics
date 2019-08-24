import { GraphQLServer, } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

const usersArr = [{
    id: 1,
    name: 'userx1',
    email: 'user1@email.com'
}, { id: 2, name: 'userzz2', email: 'user2@email.com', age: 23 }];

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        users(query: String): [User!]!
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
        users(parent, args, ctx, info) {
            const { query, } = args;
            if (!query) {
                return usersArr;
            };
            return usersArr.filter(user => {
                return user.name.toLowerCase().includes(query.toLowerCase());
            });
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