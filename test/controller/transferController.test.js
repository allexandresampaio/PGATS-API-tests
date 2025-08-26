//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//Aplicação
const app = require('../../src/app');

//Testes
describe('Transfer Controller', () => {
    describe('POST, /api/transfer', () => {
        it('Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            const resposta = await request(app)
                .post('/api/transfer')
                .send({
                    from: "alle",
                    to: "desa",
                    amount: 50
                });
            expect(resposta.status).to.equal(400);
        });
    });

    describe('GET, /api/transfer', () => {

    });
})