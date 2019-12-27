const User = {
    predictions(parent, args, { prisma }, info) {
        const opArgs = {
            where: {
                author: {
                    id: parent.id
                }
            }
        };

        return prisma.query.predictions(opArgs, info);
    }
};

export default User;