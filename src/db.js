const usersArr = [{
    id: "1",
    name: 'user1',
    email: 'user1@email.com'
}, { id: "2", name: 'user2', email: 'user2@email.com', age: 23 },];

const userPosts = [{
    id: "1", 
    title: 'firstPost',
    body: 'firstPosts body',
    published: true,
    author: "1"
}, { id: "2", title: 'secondPost', body: 'secondPosts body', published: true, author: "2", }, {
    id: "3",
    title: 'thirdPost',
    body: 'thirdPosts body',
    published: true,
    author: "2",
},];

const comments = [{
    id: "1",
    text: 'firstComment',
    author: "1",
    post: "1",
}, { id: "2", text: 'secondComment', author: "2", post: "3", }, { id: "3", text: 'thirdComment', author: "1", post: "3", },];

const db = {
    usersArr,
    userPosts, 
    comments,
};

export default db;