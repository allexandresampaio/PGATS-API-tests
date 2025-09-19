//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

//Testes
describe('User External', () => {
    describe('GET, /api/users', () => {

        it('Quando busco por usuários, o retorno será 200', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .get('/api/users');
            
            expect(resposta.status).to.equal(200);
        });

    });
})