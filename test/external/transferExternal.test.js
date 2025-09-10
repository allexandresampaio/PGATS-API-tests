//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

//Testes
describe('Transfer Controller', () => {
    describe('POST, /api/transfer', () => {
        it('Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/transfer')
                .send({
                    from: "alle",
                    to: "desa",
                    amount: 50
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
})