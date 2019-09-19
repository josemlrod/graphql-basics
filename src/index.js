import { GraphQLServer, } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID

const usersArr = [{
    id: "1",
    name: 'user1',
    email: 'user1@email.com'
}, { id: "2", name: 'user2', email: 'user2@email.com', age: 23 },];

const userPosts = [{
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
    author: "1",
},];

const comments = [{
    id: "1",
    text: 'firstComment',
    author: "1",
    post: "1",
}, { id: "2", text: 'secondComment', author: "1", post: "3", }, { id: "3", text: 'thirdComment', author: "1", post: "3", },];

// Type Definitions - App Schema
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
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
            const { name, email, age, } = args;
            const emailTaken = usersArr.some(user => user.email === email);
            if (emailTaken) throw new Error('Email is already in use.');
            else {
                const user = {
                    id: uuidv4(),
                    name, 
                    email,
                    age,
                };
                usersArr.push(user);
                return user;
            };
        },
        createPost(parent, args, ctx, info) {
            const { title, body, published, author, } = args;
            const userExists = usersArr.some(user => user.id === author);
            if (!userExists) throw new Error('User does not exist.');
            else {
                const post = {
                    id: uuidv4(),
                    title,
                    body,
                    published,
                    author,
                };
                userPosts.push(post);
                return post;
            };
        },
        createComment(parent, args, ctx, info) {
            const userExists = usersArr.some(user => user.id === args.author);
            const postExists = userPosts.some(post => post.id === args.post && post.published);
            if (!userExists || !postExists) throw new Error('User/Post does not exist.');
            else {
                const comment = {
                    id: uuidv4(),
                    text: args.text, 
                    author: args.author, 
                    post: args.post,
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