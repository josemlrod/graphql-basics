import { GraphQLServer, } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

const usersArr = [{
    id: 1,
    name: 'user1',
    email: 'user1@email.com'
}, { id: 2, name: 'user2', email: 'user2@email.com', age: 23 }];

const userPosts = [{
    id: 1, 
    title: 'firstPost',
    body: 'firstPosts body',
    published: true,
    author: 1
}, { id: 2, title: 'secondPost', body: 'secondPosts body', published: true, author: 2, }, {
    id: 3,
    title: 'thirdPost',
    body: 'thirdPosts body',
    published: true,
    author: 1,
}];

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
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
        posts(parent, args, ctx, info) {
            const { query, } = args;
            if (!query) {
                return userPosts;
            } else {
                return userPosts.filter(post => {
                    return post.title.toLowerCase().includes(query.toLowerCase());
                });
            };
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return usersArr.find(user => {
                return user.id === parent.author;
            });
        },
    },
    User: {
        posts(parent, args, ctx, info) {
            return userPosts.filter(post => {
                return post.author === parent.id;
            });
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