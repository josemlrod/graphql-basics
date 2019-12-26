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
    createPrediction(parent, args, { db }, info) {
        const prediction = {
            id: uuidv4(),
            ...args.data
        };
        db.predictions.push(prediction);
        return prediction;
    }
}

export default Mutation;