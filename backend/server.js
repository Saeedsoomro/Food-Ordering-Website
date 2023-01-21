const app = require('./app');
const dotenv = require('dotenv');

// config
dotenv.config({ path: 'backend/config/config.env' });
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
