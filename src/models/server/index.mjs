import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import { TODOS_APP_ENDPOINTS } from './constants.mjs';
import todoEndpoints from './todo-endpoints.mjs';

dotenv.config();
console.clear();

const PORT = process.env.PORT;
const app = express();

app.use(
    cors({
        // NOTE: not required
        origin: 'http://localhost:4000',
    }),
);

// NOTE: home address
app.get('/', (_, res) => {
    res.write('<h1>Hello, below the endpoints list</h1>');
    res.write('</br>');
    res.end(JSON.stringify(Object.values(TODOS_APP_ENDPOINTS)));
});

todoEndpoints(app);

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});

export default app;
