const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 80;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hi, this is a dummy web!</br><a href='/cmdi'>Go to command page</a>");
});

app.get('/cmdi', (req, res) => {
    res.sendFile(__dirname + "/public/cmdi.html");
})

app.post('/cmdi', (req, res) => {
    const command = req.body.command;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send("Error occurred : " + error.message);
            return;
        }
        if (stderr) {
            res.send("CLI error : " + stderr);
            return;
        }

        res.send("Result : " + stdout);
    })
})

app.listen(port, () => {
    console.log("Server is listening on port 80");
})
