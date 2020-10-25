import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async() => {
  return 
    request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com,',
      password: 'password'
    })
    .expect(201)
});

it('returns a 400 with an invalid email.', async() => {
  return 
    request(app)
    .post('/api/users/signup')
    .send({
      email: 'bademailaddress,',
      password: 'password'
    })
    .expect(400)
});

it('returns a 400 with an invalid password.', async() => {
  return 
    request(app)
    .post('/api/users/signup')
    .send({
      email: 'bademailaddress,',
      password: 'p'
    })
    .expect(400)
});

it('returns a 400 with missing email.', async() => {
  return 
    request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400)
});

it('returns a 400 with missing password.', async() => {
  return 
    request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400)
});

it('returns a 400 with missing email and password.', async() => {
  return 
    request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400)
});

it('returns a 400 with missing email and password (async).', async() => {
  await 
    request(app)
    .post('/api/users/signup')
    .send({email: 'test@test.com'})
    .expect(400);
  await 
    request(app)
    .post('/api/users/signup')
    .send({password: 'password'})
    .expect(400);
});

it('disallows duplicate emails', async () => {
  const response = request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com,',
    password: 'password'
  })
  .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com,',
      password: 'password'
    })
    .expect(400)
});


// it ('sets a cookie after successful signup', async() => {
//   console.log(`[signup.tests.ts] => (process.env.NODE_ENV): "${process.env.NODE_ENV}"`;
//   const response = request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com,',
//       password: 'password'
//     })
//     .expect(201);
//   const cookie = response.get('Set-Cookie');
//   console.log("[signup.tests.ts] => (response.get('Set-Cookie')):", cookie);
//   expect(response.get('Set-Cookie')).toBeDefined();
// });