const Post = {
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
};

export default Post;