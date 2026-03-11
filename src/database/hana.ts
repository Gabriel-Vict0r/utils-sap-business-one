import hana from '@sap/hana-client';


let connection: hana.Connection;

export async function getConnection(): Promise<hana.Connection> {
  if (connection) { 
    return connection;
  }

  connection = hana.createConnection();

  const connectionParams = {
    serverNode: process.env.HANA_SERVER_NODE || 'SAP-HANA01:30015',
    uid: process.env.HANA_USER,
    pwd: process.env.HANA_PASSWORD,
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