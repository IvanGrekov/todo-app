import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import { TODOS_APP_ENDPOINTS } from './constants';
import todosRouter from './routes/todos';

dotenv.config();
console.clear();

const PORT = process.env.PORT || 4001;
const server = express();

server.use(
    cors({
        // NOTE: not required
        origin: '*',
    }),
);

server.get('/', (_, res) => {
    res.write('<h1>Hello, below the endpoints list</h1>');
    res.write('</br>');
    res.end(JSON.stringify(Object.values(TODOS_APP_ENDPOINTS)));
});

server.use(express.json(), todosRouter);

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});

export default server;
