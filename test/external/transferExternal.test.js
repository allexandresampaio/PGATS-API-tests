//Bibliotecas
const request = require('supertest');
const { expect } = require('chai');

//Testes
describe('Transfer External', () => {
    describe('POST, /api/transfer', () => {
        it.only('Quando informo origem e destino inexistentes, o retorno será 400', async () => {
            //capturar o token
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/auth/login')
                .send({
                    "username": "alle",
                    "password": "123456"
                });
                
            const tokenCapturado = respostaLogin.body.token;
            
            //console.log(respostaLogin.body)
            //console.log(tokenCapturado)

            const resposta = await request('http://localhost:3000')
                .post('/api/transfer')
                .set('Authorization', `Bearer ${tokenCapturado}`)
                .send({
                    from: "alle",
                    to: "andresa",
                    amount: 50
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
})