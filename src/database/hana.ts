import hana from '@sap/hana-client';

let connection: hana.Connection;

function normalizeServerNode(raw?: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  // Some envs might provide urls like "tcp://host:port" or "https://host:port".
  // HANA driver expects "host:port".
  return trimmed.replace(/^[a-zA-Z]+:\/\//, '');
}

export async function getConnection(): Promise<hana.Connection> {
  if (connection) {
    return connection;
  }

  connection = hana.createConnection();

  const serverNode = normalizeServerNode(process.env.HANA_SERVER_NODE) || 'SAP-HANA01:30015';
  const uid = process.env.HANA_USER;
  const pwd = process.env.HANA_PASSWORD;

  if (!serverNode.includes(':')) {
    throw new Error(
      `HANA_SERVER_NODE must be in the form host:port (e.g. "myhost:30015"). Got: "${serverNode}"`
    );
  }

  const connectionParams = {
    serverNode,
    uid,
    pwd,
  };

  return new Promise((resolve, reject) => {
    connection.connect(connectionParams, (err) => {
      if (err) {
        console.error('Erro ao tentar conectar no HANA:', err);
        reject(err);
      } else {
        console.log('Conexão bem sucedida');
        resolve(connection);
      }
    })
  });
}