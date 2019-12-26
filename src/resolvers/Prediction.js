const Prediction = {
    author(parent, args, { db }, info) {
        return db.usersArr.find(user => {
            return user.id === parent.author;
        })
    }
};

export default Prediction;