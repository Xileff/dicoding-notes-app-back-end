const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  try {
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  } catch (errMsg) {
    console.error(errMsg);
  }
};

init();

// Front End : http://notesapp-v1.dicodingacademy.com/
// Disable 'Block Insecure Private Network Requestts' : chrome://flags/#block-insecure-private-network-requests 
