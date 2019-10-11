const request = require('supertest')
const app = require('../../src/app')
const { Users } = require('../../src/app/models')
const truncade = require('../util/truncade')
describe('User', () => {
    beforeEach(async () => {
        await truncade()
    })
    it('Should authenticate a user', async () => {
        const user = await Users.create({
            email: 'lfelipe.felipe4@gmail.com',
            password: 'dsadasga',
            name: 'Luis'
        })

        const response = await request(app)
            .post('/session')
            .send({
                email: user.email,
                password: user.password
            })
        expect(response.status).toBe(200)
    })

    it('should not authenticate with invalid credentials', async () => {
        const user = await Users.create({
            email: 'lfelipe.felipe4@gmail.com',
            password: 'dsadasga',
            name: 'Luis'
        })

        const response = await request(app)
            .post('/session')
            .send({
                email:user.email,
                password: '1245678'
            })

        expect(response.status).toBe(400)


    })
})