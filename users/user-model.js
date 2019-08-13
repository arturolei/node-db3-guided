const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
}

function find() {
    return db('users');
}

function findById(id){
   
    return db('users')
    .where({ id });
}

function findPosts(user_id){
    return db('posts as p')
    .join('users as u','u.id', 'p.user_id')
    .select('p.id', 'u.username','p.contents')
    .where({user_id})
    
}

function update(id, changes){
    return db('users').where({ id }).update(changes);
}

function remove(id){
    return db('users').where({ id }).del();
}

async function add(userData){
    const [id] = await db('users').insert(userData);

    return findById(id);
}