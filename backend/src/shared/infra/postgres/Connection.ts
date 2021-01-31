import Logger from '@shared/singletons/Logger';
import { Pool } from 'pg';

const connectionString = process.env.DB_URL;

const createPool = (): Pool => {
  try {
    return new Pool({
      connectionString: connectionString,
      max: 50,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  } catch (e) {
    throw new Error('Falha ao tentar iniciar Pool - pg');
  }
};

const rollback = async (
  client: { query: (arg0: string) => unknown },
  identify: unknown,
): Promise<void> => {
  try {
    await client.query('ROLLBACK');
    Logger.info('ROLLBACK', identify);
  } catch (e) {
    Logger.error(`Falha ao executar ROLLBACK`, e, identify);
  }
};

const testConnection = async (counter: number): Promise<void> => {
  counter = counter ? counter + 1 : 1;

  Logger.info(
    `Iniciado teste de conexão com banco de dados! Tentativa : ${counter} ...`,
  );

  const pool = createPool();
  const client = await pool.connect();

  const result = await client.query('SELECT NOW()');
  client.release();

  if (result.rowCount <= 0) {
    Logger.error(
      'Erro ao tentar executar query de teste [SELECT NOW()]  [Nova tentativa em 10 segundo]',
    );
    setTimeout(async () => {
      await testConnection(counter);
    }, 10000);
    return;
  }

  Logger.info(
    'Sucesso conexão com banco de dados',
    JSON.stringify(result.rows[0]),
  );
};

export default { createPool, testConnection, rollback };
