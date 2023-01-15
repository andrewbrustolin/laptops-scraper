const express = require('express');
const app = express();
const port = 8080;
const data = require('./data.json');

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 4));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
