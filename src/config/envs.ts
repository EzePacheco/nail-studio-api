import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    // ! Server
    PORT: get('PORT').required().asPortNumber(),
    NODE_ENV: get('NODE_ENV').required().asString(),


    // ! Database
    DB_HOST: get('DB_HOST').required().asString(),
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_USER: get('DB_USER').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),

};