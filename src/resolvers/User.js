const User = {
    predictions(parent, args, { db }, info) {
        return db.predictions.filter(prediction => {
            return prediction.author === parent.id;
        });
    }
};

export default User;