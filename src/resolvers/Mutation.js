import uuidv4 from 'uuid/v4';

const Mutation = {
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
}

export default Mutation;