require('dotenv').config(); /* for using .env details */
const express = require('express');
const app = express();
const port = process.env.PORT; /* using .env details */
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}/`);
});
