const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 80;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dummy'
});

connection.connect((err) => {
    if (err) {
        console.error("MySQL connection error : " + err.stack);
        return;
    }

    console.log("MySQL connection success" + connection.threadId);
})

app.get('/', (req, res) => {
    res.send("Hi, this is a dummy web!</br><a href='/cmdi'>Go to command page</a>");
});

app.get('/cmdi', (req, res) => {
    res.sendFile(__dirname + "/public/cmdi.html");
})

app.post('/cmdi', (req, res) => {
    const command = req.body.command;

    console.log("POST");

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Error occurred : ", error);
            res.send("Error occurred : " + error.message);
            return;
        }
        if (stderr) {
            console.error("CLI error : ", stderr);
            res.send("CLI error : " + stderr);
            return;
        }

        res.send("Result : " + stdout);
        console.log(stdout);
    })
})

app.listen(port, () => {
    console.log("Server is listening on port 80");
})
