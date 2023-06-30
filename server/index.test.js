const request = require('supertest')

const app = require('./index')
describe('register', ()=>{
    it('should register and return a token',async()=>{
        const response = await request(app)
        .post('/register')
        .send({username: 'testuser', password: 'testpassword'})
        expect(200)

        expect(response.body.message).toBe("foodie registered");
        expect(response.body.token).toBeDefined()

    });

 
});
