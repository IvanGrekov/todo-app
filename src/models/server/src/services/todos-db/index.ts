import { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'Cosonic56',
});

(async (): Promise<void> => {
    await client.connect();
})();

export default client;
