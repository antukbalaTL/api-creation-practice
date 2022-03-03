const express = require('express');
const app = express();
const port = 8800;

app.get('/', (req, res) => {
    res.send('working..');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
