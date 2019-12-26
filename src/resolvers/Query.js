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
    predictions(parent, args, { db }, info) {
        const { query } = args;
        if (!query) return db.predictions;
        else {
            return db.predictions.filter(prediction => {
                return prediction.id.toLowerCase().includes(query.toLowerCase());
            });
        };
    }
};

export default Query;