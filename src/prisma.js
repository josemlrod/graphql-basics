import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/rodriguez-predict-a-goal.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'thisismysupersecrettext'
})

export default prisma;