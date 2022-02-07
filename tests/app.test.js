import request from "supertest";
import app from "../src/app";
jest.mock("../src/services/userService");
describe('app test suite', () => {
    test('my first test', async () => {
        console.log('my first1 test');
    });
    
});