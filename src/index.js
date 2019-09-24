import { GraphQLServer, } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID

const usersArr = [{
    id: "1",
    name: 'user1',
    email: 'user1@email.com'
}, { id: "2", name: 'user2', email: 'user2@email.com', age: 23 },];

let userPosts = [{
    id: "1", 
    title: 'firstPost',
    body: 'firstPosts body',
    published: true,
    author: "1"
}, { id: "2", title: 'secondPost', body: 'secondPosts body', published: true, author: "2", }, {
    id: "3",
    title: 'thirdPost',
    body: 'thirdPosts body',
    published: true,
    author: "2",
},];

let comments = [{
    id: "1",
    text: 'firstComment',
    author: "1",
    post: "1",
}, { id: "2", text: 'secondComment', author: "2", post: "3", }, { id: "3", text: 'thirdComment', author: "1", post: "3", },];

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
    }

    type Mutation {
        createUser(data: createUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: createPostInput!): Post!
        createComment(data: createCommentInput!): Comment!
    }

    input createUserInput {
        name: String!
        email: String!
        age: Int
    }

    input createPostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input createCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
    // resolvers parameters: parent, args, ctx, info
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
        comments(parent, args, ctx, info) {
            const { query, } = args;
            if (!query) return comments;
            else {
                return comments.filter(comment => {
                    return comment.text.toLowerCase().includes(query.toLowerCase());
                });
            };
        },
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = usersArr.some(user => user.email === args.data.email);
            if (emailTaken) throw new Error('Email is already in use.');
            else {
                const user = {
                    id: uuidv4(),
                    ...args.data,
                };
                usersArr.push(user);
                return user;
            };
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = usersArr.findIndex(user => user.id === args.id);
            if (userIndex === -1) throw new Error('User not found');
            else {
                const deletedUsers = usersArr.splice(userIndex, 1);
                userPosts = userPosts.filter(post => {
                    const match = post.author === args.id;
                    if (match) {
                        comments = comments.filter(comment => comment.post !== post.id);
                    }
                    return !match;
                })
                comments = comments.filter(comment => comment.author !== args.id);
                return deletedUsers[0];
            };
        },
        createPost(parent, args, ctx, info) {
            const userExists = usersArr.some(user => user.id === args.data.author);
            if (!userExists) throw new Error('User does not exist.');
            else {
                const post = {
                    id: uuidv4(),
                    ...args.data,
                };
                userPosts.push(post);
                return post;
            };
        },
        createComment(parent, args, ctx, info) {
            const userExists = usersArr.some(user => user.id === args.data.author);
            const postExists = userPosts.some(post => post.id === args.data.post && post.published);
            if (!userExists || !postExists) throw new Error('User/Post does not exist.');
            else {
                const comment = {
                    id: uuidv4(),
                    ...args.data,
                };
                comments.push(comment);
                return comment;
            };
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return usersArr.find(user => {
                return user.id === parent.author;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.post === parent.id;
            });
        },
    },
    User: {
        posts(parent, args, ctx, info) {
            return userPosts.filter(post => {
                return post.author === parent.id;
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.author === parent.id;
            });
        },
    },
    Comment: {
        author(parent, args, ctx, info) {
            return usersArr.find(user => {
                return user.id === parent.author;
            })
        },
        post(parent, args, ctx, info) {
            return userPosts.find(post => {
                return post.id === parent.post;
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