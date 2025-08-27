//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//Aplicação
const app = require('../../src/app');

//Mock
const transferService = require('../../src/services/transferService');

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
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

        //Mockar apenas a funcao transfer
        it('Usando Mocks: Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

            const resposta = await request(app)
                .post('/api/transfer')
                .send({
                    from: "alle",
                    to: "desa",
                    amount: 50
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            //Resete o mock
            sinon.restore();
        });
    });

    describe('GET, /api/transfer', () => {

    });
})