const factory = require('factory-girl')
const faker = require('faker')
const { Users } = require('../src/app/models')


factory.define('Users', Users, {
    email:faker.internet.email(),
    name: faker.name.findName(),
    password: faker.internet.password()
})

module.exports = factory