const request = require('supertest');
const { expect } = require('chai');

describe('Testes de Transferência - Graphql', () => {

    before(async () => { //beforeEach somente se os testes demorassem mais que o tempo do token
        //capturar o token
        const loginUser = require('../fixture/requests/login/loginUser.json');
        const respostaLogin = await request('http://localhost:4000')
        .post('/graphql')
        .send(loginUser)
        tokenCapturado = respostaLogin.body.data.login.token
        //console.log(this.tokenCapturado);
    })

    beforeEach(() => {
        createTransfer = require('../fixture/requests/transferencia/createTransfer.json')
    })

    it('Validar que é possível transferir entre duas contas', async () => {
        const respostaTransferencia = await request('http://localhost:4000')
        .post('/graphql')
        .set('Authorization', `Bearer ${tokenCapturado}`)
        .send(createTransfer)
        expect(respostaTransferencia.status).to.equal(200);
        expect(respostaTransferencia.body.data.transfer).to.include({
            from: 'alle',
            to: 'desa',
            amount: 312
        });
        expect(respostaTransferencia.body.data.transfer.date).to.exist;
    });

    it('Validar que não é possível realizar transferência com valor acima do saldo em conta', async () => {
        createTransfer.variables.amount = 10000.01
        const respostaTransferencia = await request('http://localhost:4000')
        .post('/graphql')
        .set('Authorization', `Bearer ${tokenCapturado}`)
        .send(createTransfer)
        //console.log(respostaTransferencia.body.errors[0].message);
        expect(respostaTransferencia.status).to.equal(200);  
        expect(respostaTransferencia.body.errors[0].message).to.equal('Saldo insuficiente');
    });
});