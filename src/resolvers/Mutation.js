const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const { data } = args;
        const isEmailTaken = await prisma.exists.User({
            email: data.email
        });

        if (isEmailTaken) throw new Error('Email address is already in use');
        else {
            return prisma.mutation.createUser({ data }, info);
        };
    },
    async deleteUser(parent, args, { prisma }, info) {
        const { data } = args;
        const doesUserExist = await prisma.exists.User({
            ...data
        });

        if (!doesUserExist) throw new Error('User does not exist');
        else {
            const opArgs = {
                where: {
                    email: data.email
                }
            };
    
            return prisma.mutation.deleteUser(opArgs, info);
        };
    },
    async updateUser(parent, args, { prisma }, info) {
        const { where, data } = args;
        const doesUserExist = await prisma.exists.User({
            ...where
        })

        if (!doesUserExist) throw new Error('User not found');
        else {
            return prisma.mutation.updateUser({
                data: { ...data },
                where: { ...where }
            }, info);
        };
    },
    async createPrediction(parent, args, { prisma }, info) {
        const { data } = args;
        const doesUserExist = await prisma.exists.User({
            ...data.author.connect
        });

        if (!doesUserExist) throw new Error('User not found');
        else {
            return prisma.mutation.createPrediction({ data }, info);
        };
    }
}

export default Mutation;