const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())

const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

app.post('/v1/people', (req,res) => {

    var contentType = req.header('content-type'); 

    if (contentType != 'application/json') {
        res.statusMessage = "Wrong contenty-type header";
        res.status(400).end();
        return        
    }

    if (Object.keys(req.body).length === 0) {
        res.statusMessage = "Empty request body";
        res.status(400).end();
        return  
     }

    const name = req.body.name

    const connection = mysql.createConnection(config)
    const sql1 = `INSERT INTO people(name) values("${name}")`
    connection.query(sql1, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });

    const sql2 = `SELECT name FROM people`
    connection.query(sql2, function (err, result, fields) {
        if (err) throw err;

        var names = []

        Object.keys(result).forEach(function(key) {
            var row = result[key];
            names.push(row.name)
        });

        var result = {
            "title" : "<h1>Full Cycle</h1>",
            "names" : names
        }
        res.contentType('application/json')
        res.send(JSON.stringify(result))    
    });
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})