//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');

//Aplicação
const app = require('../../app');

//Testes
describe('Transfer Controller', () => {
    describe('POST, /transfers', () => {
        it('Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    from: "alle",
                    to: "desa",
                    value: 50
                });
            expect(resposta.status).to.equal(400);
        });
    });

    describe('GET, /transfers', () => {

    });
})