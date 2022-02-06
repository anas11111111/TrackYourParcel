import request from "supertest";
import app from "../src/app"
describe('app test suite', () => {
    test('my first test', async () => {
        console.log('my first1 test');
    });
    test('my first test', async () => {
        console.log('my first test');
        let response = await request(app).get('./users');
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });
});