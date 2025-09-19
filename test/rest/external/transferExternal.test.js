//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

//Testes
describe('Transfer External', () => {
    describe('POST, /api/transfer', () => {
        it('Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            //capturar o token
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/api/auth/login')
                .send({
                    "username": "alle",
                    "password": "123456"
                });
                
            const tokenCapturado = respostaLogin.body.token;

            //console.log("_________________________")
            //console.log(respostaLogin.body)
            //console.log(tokenCapturado)
            //console.log("_________________________")


            const resposta = await request(process.env.BASE_URL_REST)
                .post('/api/transfer')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send({
                    from: "alle",
                    to: "andresa", //usuario inexistente
                    amount: 50
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
})