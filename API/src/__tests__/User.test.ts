import { app } from '../app';
import request from 'supertest';

import createConnection from '../database';
import { getConnection } from 'typeorm';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it('Should create a new User', async () => {
        const response = await request(app).post('/users').send({
            email: 'example@gmail.com',
            name: 'User example'
        });

        expect(response.status).toBe(201);
    });

    it('Shouldn\'t create new User if email already exists', async () => {
        const response = await request(app).post('/users').send({
            email: 'example@gmail.com',
            name: 'User example'
        });

        expect(response.status).toBe(400);
    });
});
