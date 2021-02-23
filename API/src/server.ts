import express from 'express';

const app = express();


/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */

// localhost:3333/users
app.get('/', (request, response) => {
    // return response.send('Hello world - NLW04');
    return response.json({ message: 'Hello world - NLW04' });
});

app.post('/', (request, response) => {
    return response.json({ message: 'Os dados foram salvos com sucesso!' });
});

app.listen(3333, () => console.log('server is runing!'));