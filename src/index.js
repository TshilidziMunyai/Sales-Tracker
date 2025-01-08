const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./api_routes');  

const port = 3000;

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
