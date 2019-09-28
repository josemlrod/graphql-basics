const Comment = {
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
};

export default Comment;