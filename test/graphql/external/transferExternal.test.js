const request = require('supertest');
const { expect, use } = require('chai');
require('dotenv').config();

const chaiExclude = require('chai-exclude');
use(chaiExclude);

describe('Testes de Transferência - Graphql', () => {

    before(async () => { //beforeEach somente se os testes demorassem mais que o tempo do token
        //capturar o token
        const loginUser = require('../fixture/requests/login/loginUser.json');
        const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
        .post('/graphql')
        .send(loginUser)
        tokenCapturado = respostaLogin.body.data.login.token
        //console.log(this.tokenCapturado);
    })

    beforeEach(() => {
        createTransfer = require('../fixture/requests/transferencia/createTransfer.json')
    })

    it('Validar que é possível transferir entre duas contas', async () => {
        const respostaEsperada = require('../fixture/returns/transferencia/validarTransferenciaEntre2Contas.json')
        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${tokenCapturado}`)
            .send(createTransfer)
        expect(respostaTransferencia.status).to.equal(200);
        
        //confirmando por fixture
        expect(respostaTransferencia.body.data.transfer)
            .excluding('date')
            .to.deep.equal(respostaEsperada.data.transfer);
    });

    it('Validar que não é possível realizar transferência com valor acima do saldo em conta', async () => {
        createTransfer.variables.amount = 10000.01
        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
        .post('/graphql')
        .set('Authorization', `Bearer ${tokenCapturado}`)
        .send(createTransfer)
        //console.log(respostaTransferencia.body.errors[0].message);
        expect(respostaTransferencia.status).to.equal(200);  
        expect(respostaTransferencia.body.errors[0].message).to.equal('Saldo insuficiente');
    });
});