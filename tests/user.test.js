const request= require('supertest');
const app = require('../server');

var TOKEN = '';

describe('User APIs - /user', ()=>{
    test('POST - /login ==> will login user', async () => {
        return request(app)
         .post('/user/login')
         .send({email:'sreehari@gmail.com', password:'sreehari123'})
         .expect(200)
         .then(res=>{
            TOKEN = res.body.token;
         });
         
    });

    test('POST - /logout ==> will logout user', async () => {
        const response = await request(app)
         .post('/user/logout')
         .set('Authorization', `Bearer ${TOKEN}`)
         .send();
         expect(response.statusCode).toEqual(200);
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
