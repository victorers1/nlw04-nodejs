import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */
const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log('server is runing!'));
