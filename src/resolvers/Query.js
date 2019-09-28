const Query = {
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
};

export default Query;