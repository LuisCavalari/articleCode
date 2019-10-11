const factory = require('../factory')
describe('User',()=>{
    
    it('Should authenticate a user',()=>{
        const user = await factory.create("User");
    })
})