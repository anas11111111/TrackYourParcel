import request from "supertest";
import app from "../src/app";
jest.mock("../src/services/userService");
describe('UserController Test Suite', () => {
    test('getAllUsers should return an array of users', async () => {

        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]._id).toBe('1');
    });
});
