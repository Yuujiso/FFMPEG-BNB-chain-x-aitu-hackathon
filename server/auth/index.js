const express = require('express');
const app = express();
app.use(express.urlencoded)

app.post('/auth', (req, res) => {
    console.log(`process.env.KEY = ${process.env.KEY}`)
    const key = req.body.key;
    console.log(`from request = ${key}`);
    if (key === process.env.KEY) {
        res.status(200).send();
        return;
    }

    res.status(403).send();
})

app.listen(8000, () => {
    console.log("server started...");
})