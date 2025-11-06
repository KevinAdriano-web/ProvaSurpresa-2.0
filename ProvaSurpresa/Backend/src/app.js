import { adicionarRotas } from './rotas.js';

import express from 'express'
import cors from 'cors'

const api = express();
api.use(cors());
api.use(express.json());

adicionarRotas(api);

api.listen(5010, () => console.log('..: API subiu com sucesso'))

