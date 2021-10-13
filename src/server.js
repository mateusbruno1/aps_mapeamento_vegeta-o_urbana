import App from './app';

require('dotenv/config');

console.log('server started');

App.listen(process.env.PORT || 3333);
