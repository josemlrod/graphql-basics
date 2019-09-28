import { GraphQLServer, } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';

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

// Resolvers
const resolvers = {
    // resolvers parameters: parent, args, ctx, info
    Query: {
        users(parent, args, { db, }, info) {
            const { query, } = args;
            if (!query) {
                return db.usersArr;
            };
            return db.usersArr.filter(user => {
                return user.name.toLowerCase().includes(query.toLowerCase());
            });
        },
        posts(parent, args, { db, }, info) {
            const { query, } = args;
            if (!query) {
                return db.userPosts;
            } else {
                return db.userPosts.filter(post => {
                    return post.title.toLowerCase().includes(query.toLowerCase());
                });
            };
        },
        comments(parent, args, { db, }, info) {
            const { query, } = args;
            if (!query) return db.comments;
            else {
                return db.comments.filter(comment => {
                    return comment.text.toLowerCase().includes(query.toLowerCase());
                });
            };
        },
    },
    Mutation: {
        createUser(parent, args, { db, }, info) {
            const emailTaken = db.usersArr.some(user => user.email === args.data.email);
            if (emailTaken) throw new Error('Email is already in use.');
            else {
                const user = {
                    id: uuidv4(),
                    ...args.data,
                };
                db.usersArr.push(user);
                return user;
            };
        },
        deleteUser(parent, args, { db, }, info) {
            const userIndex = db.usersArr.findIndex(user => user.id === args.id);
            if (userIndex === -1) throw new Error('User not found');
            else {
                const deletedUsers = db.usersArr.splice(userIndex, 1);
                db.userPosts = userPosts.filter(post => {
                    const match = post.author === args.id;
                    if (match) {
                        db.comments = db.comments.filter(comment => comment.post !== post.id);
                    }
                    return !match;
                })
                db.comments = db.comments.filter(comment => comment.author !== args.id);
                return deletedUsers[0];
            };
        },
        createPost(parent, args, { db, }, info) {
            const userExists = db.usersArr.some(user => user.id === args.data.author);
            if (!userExists) throw new Error('User does not exist.');
            else {
                const post = {
                    id: uuidv4(),
                    ...args.data,
                };
                db.userPosts.push(post);
                return post;
            };
        },
        deletePost(parent, args, { db, }, info) {
            const postIdx = db.userPosts.findIndex(post => post.id === args.id);
            if (postIdx === -1) throw new Error('Couldnt find post.');
            else {
                const deletedPosts = db.userPosts.splice(postIdx, 1);
                db.comments = db.comments.filter(comment => comment.post !== args.id);
                return deletedPosts[0];
            };
        },
        createComment(parent, args, { db, }, info) {
            const userExists = db.usersArr.some(user => user.id === args.data.author);
            const postExists = db.userPosts.some(post => post.id === args.data.post && post.published);
            if (!userExists || !postExists) throw new Error('User/Post does not exist.');
            else {
                const comment = {
                    id: uuidv4(),
                    ...args.data,
                };
                db.comments.push(comment);
                return comment;
            };
        },
        deleteComment(parent, args, { db, }, info) {
            const commentIdx = db.comments.findIndex(comment => comment.id === args.id);
            if (commentIdx === -1) throw new Error('Couldnt find comment');
            else {
                const deletedComments = db.comments.splice(commentIdx, 1);
                return deletedComments[0];
            };
        },
    },
    Post: {
        author(parent, args, { db, }, info) {
            return db.usersArr.find(user => {
                return user.id === parent.author;
            });
        },
        comments(parent, args, { db, }, info) {
            return db.comments.filter(comment => {
                return comment.post === parent.id;
            });
        },
    },
    User: {
        posts(parent, args, { db, }, info) {
            return db.userPosts.filter(post => {
                return post.author === parent.id;
            });
        },
        comments(parent, args, { db, }, info) {
            return db.comments.filter(comment => {
                return comment.author === parent.id;
            });
        },
    },
    Comment: {
        author(parent, args, { db, }, info) {
            return db.usersArr.find(user => {
                return user.id === parent.author;
            })
        },
        post(parent, args, { db, }, info) {
            return db.userPosts.find(post => {
                return post.id === parent.post;
            });
        },
    },
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db, 
    },
});

server.start(_ => {
    console.log('Running...')
});