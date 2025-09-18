const request = require('supertest');
const { expect } = require('chai');

describe('Testes de Transferência - Graphql', () => {

    beforeEach(async () => {
        //capturar o token
        const respostaLogin = await request('http://localhost:4000')
        .post('/graphql')
        .send({
            query: `
                mutation Login($username: String!, $password: String!) {
                    login(username: $username, password: $password) {
                        token
                    }
                } `,
            variables: {
                username: 'alle',
                password: '123456'
            }
        })

        tokenCapturado = respostaLogin.body.data.login.token
        //console.log(this.tokenCapturado);
    })

    it('Validar que é possível transferir entre duas contas', async () => {
        
        const respostaTransferencia = await request('http://localhost:4000')
        .post('/graphql')
        .set('Authorization', `Bearer ${tokenCapturado}`)
        .send({
            query: `
                mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                    transfer(from: $from, to: $to, amount: $amount) {
                        from
                        to
                        amount
                        date
                    }
                } `,
            variables: {
                from: 'alle',
                to: 'desa',
                amount: 312
            }
        })
        expect(respostaTransferencia.status).to.equal(200);
        expect(respostaTransferencia.body.data.transfer).to.include({
            from: 'alle',
            to: 'desa',
            amount: 312
        });
        expect(respostaTransferencia.body.data.transfer.date).to.exist;
    });

    it('Validar que não é possível realizar transferência com valor acima do saldo em conta', async () => {
        const respostaTransferencia = await request('http://localhost:4000')
        .post('/graphql')
        .set('Authorization', `Bearer ${tokenCapturado}`)
        .send({
            query: `
                mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                    transfer(from: $from, to: $to, amount: $amount) {
                        from
                        to
                        amount
                        date
                    }
                } `,
            variables: {
                from: 'alle',
                to: 'desa',
                amount: 10000.01
            }
        })
        //console.log(respostaTransferencia.body.errors[0].message);
        expect(respostaTransferencia.status).to.equal(200);  
        expect(respostaTransferencia.body.errors[0].message).to.equal('Saldo insuficiente');
    });
});