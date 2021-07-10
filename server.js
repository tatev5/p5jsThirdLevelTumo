var express = require('express');
var app = express();
var server = require('http').createServer(app);
io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html')
});
server.listen(3000, () => {
    console.log('ok');
});

matrix = [];

function mathGenerator(n, m) {
    for (var i = 0; i < n; i++) {
        matrix.push([])
        for (var j = 0; j < m; j++) {

            matrix[i].push(Math.round(Math.random() * 1))
        }
    }
    matrix[3][5] = 2;
    matrix[3][6] = 8;
    matrix[3][7] = 7;
    matrix[4][7] = 5;
};

mathGenerator(15, 15)


io.sockets.emit('send matrix', matrix);

personArr = [];
coronaArr = [];
docArr = [];
hosArr = [];
healthyPersonArr = []

Person = require('./Class/Person');
Corona = require('./Class/Corona');
Doc = require('./Class/Doc');
HealthyPerson = require('./Class/HealthyPerson');
Hospital = require('./Class/Hospital');

function createObject(matrix) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Person(x, y);
                personArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var fr = new Corona(x, y)
                coronaArr.push(fr)
            } else if (matrix[y][x] == 8) {
                var et = new Doc(x, y)
                docArr.push(et)
            } else if (matrix[y][x] == 7) {
                var ho = new Hospital(x, y)
                hosArr.push(ho)
            } else if (matrix[y][x] == 5) {
                var he = new HealthyPerson(x, y)
                hosArr.push(he)
            }
        }
    }

    io.sockets.emit('send matrix', matrix)


}

function game() {
    for (var i in personArr) {
        personArr[i].mul()
    }
    for (var i in coronaArr) {
        coronaArr[i].eat()
    }
    for (var i in docArr) {
        docArr[i].eat()
    }

    for (var i in hosArr) {
        hosArr[i].eat()
    }
    for (var i in healthyPersonArr) {
        healthyPersonArr[i].eat()
    }

    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 1000)
io.on('connection', function (socket) {
    createObject(matrix);
    socket.on("kill", kill);
})



function kill() {
    personArr = [];
    coronaArr = [];
    docArr = [];
    hosArr = [];
    healthyPersonArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 1;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


var statistics = {};

setInterval(function() {
    statistics.person = personArr.length;
    statistics.coronaArr = coronaArr.length;
    statistics.docArr = docArr.length;
    statistics.hosArr = hosArr.length;
    statistics.healthyPersonArr = healthyPersonArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        
    })
},1000)