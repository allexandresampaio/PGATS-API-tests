const request = require('supertest');
const { expect } = require('chai');

describe('Testes de Transferência - Graphql', () => {
    it('Validar que é possível transferir entre duas contas', async () => {
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

        const tokenCapturado = respostaLogin.body.data.login.token
        //console.log(tokenCapturado)

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
    });
});