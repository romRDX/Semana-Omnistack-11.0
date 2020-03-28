const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe( 'INCIDENT', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    })

    it('should be able to create a new incidenta', async () => {
        const response = await request(app)
            .post('/incidents')
            .send({
                title: "Cadelinha atropelada",
	            description: "Descrição aleatória",
	            value: 120,
            }).auth('Authorization', 'e1fc35f6');
        
        console.log(response.body);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeLessThan(1000);
    });
});