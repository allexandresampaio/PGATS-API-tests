//Bibliotecas
const request = require('supertest');
//const sinon = require('sinon')
const { expect } = require('chai');

//Aplicação
const app = require('../../../src/app');


//Testes
describe('User Controller', () => {
    describe('GET, /api/users', () => {

        it('Quando busco por usuários, o retorno será 200', async () => {
            const resposta = await request(app)
                .get('/api/users');
            
            expect(resposta.status).to.equal(200);
        });

    });
})