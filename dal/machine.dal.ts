import pg, { QueryResult } from 'pg';

const { Client } = pg;

export const runQuery = async <T>(queryTextOrConfig: string | pg.QueryConfig<any[]>, values?: any[]): Promise<QueryResult | undefined> => {
  const client = new Client();
  await client.connect();

  try {
    return client.query(queryTextOrConfig, values) as Promise<QueryResult>;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
