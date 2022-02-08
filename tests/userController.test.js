import request from "supertest";
import app from "../src/app";
jest.mock("../src/services/userService");
describe('UserController Test Suite', () => {
    test('get should return an array of users', async () => {

        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.length).toBeGreaterThan(0);
        expect(users[0].id).toBe('1');
    });
    test('post should return saved Id', async () => {

        let user = {
            username: 'user2'
        };
        let response = await request(app).post('/users').send(user);
        expect(response.statusCode).toBe(201);
        let body = response.body;
        expect(body.length).toBe(24);
        let savedUserResponse = await request(app).get('/users/' + body);
        let savedUser = savedUserResponse.body;
        expect(savedUser.createAt).not.toBeNull();
        expect(savedUser.username).toBe(user.username);

    });

    test('get by id should return an user', async () => {
        let response = await request(app).get('/users/1');
        let user = response.body;
        console.log("user", user);
        expect(user.id).toBe('1');
    });
    test.only('put should update an existing user', async () => {
        let user = 
            {
                id: '1',
                username: 'user001'
            };
        let response = await request(app).put('/users').send(user);
        expect(response.statusCode).toBe(200);
        let updatedUserResponse = await request(app).put('/users/1');
        let updatedUser = updatedUserResponse.body;
        expect(updatedUser.username).toBe(user.username);
        
    });

});
