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

    it('Should create new Survey', async () => {
        const response = await request(app).post('/surveys').send({
            title: 'Avaliação semestral',
            description: 'De 0 a 10, o quanto você gostou de pagar Modelagem?'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('Should get all surveys', async () => {
        await request(app).post('/surveys').send({
            title: 'Survey example2',
            description: 'Survey description'
        });

        const response = await request(app).get('/surveys');

        expect(response.body.length).toBe(2);
    });
});
