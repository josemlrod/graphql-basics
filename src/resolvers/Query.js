const Query = {
    users(parent, args, { db, prisma }, info) {
        const opArgs = {};

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            };
        };

        return prisma.query.users(opArgs, info);
    },
    predictions(parent, args, { db, prisma }, info) {
        const opArgs = {};

        if (args.query) {
            opArgs.where = {
                OR: [{
                    id: args.query
                }, {
                    ballondor: args.query
                }]
            }
        };

        return prisma.query.predictions(opArgs, info);
    }
};

export default Query;