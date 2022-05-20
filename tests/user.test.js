const request= require('supertest');
const app = require('../server');


describe('User APIs - /user', ()=>{
    test('POST - /login ==> will login user', async () => {
        return request(app)
         .post('/user/login')
         .send({email:'sreehari@gmail.com', password:'12345'})
         .expect(200);
    });

    test('POST - /logout ==> will logout user', async () => {
        const response = await request(app)
         .post('/user/login')
         .send({email:'sreehari@gmail.com', password:'12345'});
         expect(response.statusCode).toEqual(200);
         expect(response.body).toHaveProperty('token');
    });

    /* Testing true negative case by giving wrong credentials */

    test('POST - /login ==> should throw 403', async () => {
        return request(app)
         .post('/user/login')
         .send({email:'sreehari@gmail.com', password:'xxxxx'})
         .expect(403);
    });

    afterEach(async () => {
        await app.close();        
    });
    
});
