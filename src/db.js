const usersArr = [{
    id: "1",
    name: 'user1',
    email: 'user1@email.com',
    age: 24,
}, { id: "2", name: 'user2', email: 'user2@email.com', age: 23 },];

const predictions = [
    {
        id: "111234",
        author: "1",
        ballondor: 'Messi',
        champions_league: "Barcelona FC",
        la_liga: "Real Madrid",
        premier_league: "Manchester United",
        serie_a: "Juventus",
        bundesliga: "N/A",
        ligue_1: "N/A",
        eurocup: "France",
        copa_america: "Brazil"
    },
    {
        id: "11123114",
        author: "2",
        ballondor: 'CR7',
        champions_league: "Real Madrid CF",
        la_liga: "Real Madrid",
        premier_league: "Manchester United",
        serie_a: "Juventus",
        bundesliga: "N/A",
        ligue_1: "N/A",
        eurocup: "France",
        copa_america: "Brazil"
    }
]

const db = {
    usersArr,
    predictions
};

export default db;