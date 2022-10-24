const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
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
