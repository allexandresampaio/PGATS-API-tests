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

        let tokenCapturado = null;

        beforeEach(async () => {
            //capturar o token
            const respostaLogin = await request(app)
                .post('/api/auth/login')
                .send({
                    "username": "alle",
                    "password": "123456"
                });
            this.tokenCapturado = respostaLogin.body.token;
        })

        it('Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            const resposta = await request(app)
                .post('/api/transfer')
                .set('Authorization', `Bearer ${this.tokenCapturado}`)
                .send({
                    from: "allexandre",
                    to: "andresa",
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
                .set('Authorization', `Bearer ${this.tokenCapturado}`)
                .send({
                    from: "allexandre",
                    to: "andresa",
                    amount: 50
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            //Resete o mock
            sinon.restore();
        });


        //Mockar apenas a funcao transfer
        it('Usando Mocks: Quando informo origem e destino existentes, o retorno será 201', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "alle",
                to: "desa",
                amount: 50,
                date: new Date().toISOString()
            });

            const resposta = await request(app)
                .post('/api/transfer')
                .set('Authorization', `Bearer ${this.tokenCapturado}`)
                .send({
                    from: "alle",
                    to: "desa",
                    amount: 50
                });
            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('from', 'alle');
            expect(resposta.body).to.have.property('to', 'desa');
            expect(resposta.body).to.have.property('amount', 50);

            //Resete o mock
            sinon.restore();
        });


         //Mockar apenas a funcao transfer e usando uma fixture pra comparar a resposta
         //only = apenas esse teste vai rodar
        it('Usando Mocks e Fixture: Quando informo origem e destino existentes, o retorno será 201', async () => {
            //Mockar apenas a funcão transfer do Service            
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "alle",
                to: "desa",
                amount: 50,
                date: new Date().toISOString()
            });

            const resposta = await request(app)
                .post('/api/transfer')
                .set('Authorization', `Bearer ${this.tokenCapturado}`)
                .send({
                    from: "alle",
                    to: "desa",
                    amount: 50
                });
            expect(resposta.status).to.equal(201);
            
            //Validação com fixture
            const respostaEsperada = require('../fixture/respostas/return-origemDestinoOkStatus201.json')

            delete resposta.body.date;
            delete respostaEsperada.date;
            expect(respostaEsperada).to.deep.equal(respostaEsperada);
            
            //expect(resposta.body).to.have.property('from', 'alle');
            //expect(resposta.body).to.have.property('to', 'desa');
            //expect(resposta.body).to.have.property('amount', 50);
        });
        
        afterEach(() => {
            //Resete o mock
            sinon.restore();
        })

    });

    describe('GET, /api/transfer', () => {

    });
})