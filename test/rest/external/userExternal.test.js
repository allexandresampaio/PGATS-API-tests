//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

//Testes
describe('User External', () => {
    describe('GET, /api/users', () => {

        it('Quando busco por usuários, o retorno será 200', async () => {
            const resposta = await request("http://localhost:3000")
                .get('/api/users');
            
            expect(resposta.status).to.equal(200);
        });

    });
})