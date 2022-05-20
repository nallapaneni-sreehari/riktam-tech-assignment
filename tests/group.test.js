const request= require('supertest');
const app = require('../server');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1MzA1MzU3OH0.SX7mfvkpPfepYGRbCkhfV19WfWYJrBc2M3Utbs1MQHo';

const uniqId = Math.floor(Date.now()/1000);

describe('Group APIs - /group', () => {
  test('POST - /createGroup ==> will create a Group', async () => {
    return request(app)
     .post('/group/createGroup')
     .send({name:`Test_group_${uniqId}`})
     .set('Authorization', `Bearer ${TOKEN}`)
     .expect(201);
  });

  /* true negative case for deleting non existing group */
  test('POST - /deleteGroup ==> will delete a Group', async () => {
    return request(app)
     .delete('/group/deleteGroup/dummy-group')
     .set('Authorization', `Bearer ${TOKEN}`)
     .expect(404);
  });

  test('POST - /searchGroup ==> will search for a group', async () => {
    return request(app)
     .get('/group/searchGroup/test')
     .set('Authorization', `Bearer ${TOKEN}`)
     .expect('Content-Type',/json/)
     .expect(200)
     .then((res)=>{
      expect(res.body.data).toEqual(expect.arrayContaining([
          expect.objectContaining({
              "_id":expect.any(String),
              "name":expect.any(String),
              "createdBy":expect.any(String),
              "members":expect.any(Array),
              "createdAt":expect.any(String),
              "__v":expect.any(Number)
          })
      ]));
  });
  });

  test('POST - /addMemberToGroup ==> will add a member to a group', async () => {
    return request(app)
     .post('/group/addMemberToGroup')
     .send({memberEmail:'test@gmail.com', groupName:'test-group'})
     .set('Authorization', `Bearer ${TOKEN}`)
     .expect(200);
  });


  test('POST - /sendMessage ==> will send message in group', async () => {
    return request(app)
     .post('/group/sendMessageInGroup/welcome-group')
     .send({message:'Hello, How are you'})
     .set('Authorization', `Bearer ${TOKEN}`)
     .expect(201);
  });

  test('POST - /likeMessage ==> will increase likes count of message', async () => {
    return request(app)
     .patch('/group/likeMessage/6287b78582b92c6c4f8c6560')
     .set('Authorization', `Bearer ${TOKEN}`)
     .expect(200);
  });

  afterEach(async () => {
    await app.close();        
  });

});