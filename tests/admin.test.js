const request= require('supertest');
const app = require('../server');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc3Rlci1hZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTMxMTYzNTF9.3qYGFavMsVtcSa02DCfbBzrvRjaW9TOOjPuB6lwXx-I';

const uniqueId = Math.floor(Date.now()/1000);

const user = {
  email:`test_${uniqueId}@gmail.com`,
  password:uniqueId,
  role:'admin'
};

describe('Admin APIs - /admin', () => {


    test('POST - /addUser ==> will add the user', async () => {
       return request(app)
        .post('/admin/addUser')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(user)
        .expect(201);
    });

    test('POST - /editUser ==> will edit the user', async () => {
      return request(app)
      .post('/admin/editUser')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({email:'test_1653065616@gmail.com', role:'user', password:'changed'})
      .expect(200);
    });

    /* Testing a true negative case by giving wrong token*/
    test('POST - /addUser ==> should throw 403', async () => {
      return request(app)
       .post('/admin/addUser')
       .set('Authorization', `Bearer xxx`)
       .send(user)
       .expect(403);
   });

   afterEach(async () => {
    await app.close();        
  });
});
