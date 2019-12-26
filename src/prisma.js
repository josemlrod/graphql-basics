import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/rodriguez-predict-a-goal.graphql',
    endpoint: 'localhost:4466'
})