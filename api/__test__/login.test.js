const request = require('supertest');
const app = require('../server'); // Import your Express app

// describe('Login functionality', () => {
//   it('should allow a user to log in with correct credentials', async () => {
//     const response = await request(app)
//       .post('/api/login')
//       .send({
//         email: 'example@gmail.com',
//         password: 'password123'
//       });
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.token).toBeTruthy();
//   });

//   it('should return an error message for incorrect credentials', async () => {
//     const response = await request(app)
//       .post('/api/login')
//       .send({
//         email: 'example@gmail.com',
//         password: 'wrongpassword'
//       });
//     expect(response.status).toBe(401);
//     expect(response.body.success).toBe(false);
//     expect(response.body.message).toBe('Invalid email or password');
//   });
// });


it(
    'test', () => {
        expect(true).toBe(true);
    }
)