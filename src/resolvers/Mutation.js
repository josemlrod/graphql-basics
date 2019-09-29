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
    updateUser(parent, args, { db, }, info) {
        const { id, data, } = args;
        const user = db.usersArr.find(user => user.id === args.id);
        if (!user) throw new Error('User not found');
        else {
            if (typeof data.email === 'string') {
                const emailTaken = db.usersArr.some(user => user.email === data.email);
                if (emailTaken) throw new Error('Email in use.');
            };
            user.email = data.email;

            if (typeof data.name === 'string') user.name = data.name;

            if (typeof data.age !== 'undefined') {
                user.age = data.age;
            };
            return user;
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
    updatePost(parent, args, { db, }, info) {
        const { id, data, } = args;
        const post = db.userPosts.find(post => post.id === id);
        if (!post) throw new Error('Post does not exist.');
        else {
            console.log(data);
            if (typeof data.title === 'string') post.title = data.title;
            if (typeof data.body === 'string') post.body = data.body;
            if (typeof data.published === 'boolean') post.published = data.published;
            return post;
        }
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
    updateComment(parent, args, { db, }, info) {
        const { id, data, } = args;
        const comment = db.comments.find(comment => comment.id === id);
        if (!comment) throw new Error('Comment does not exist.');
        else {
            if (typeof data.text === 'string') comment.text = data.text;
            return comment;
        };
    },
}

export default Mutation;