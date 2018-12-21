const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const mongo = require("mongoose");
const app = express();
const url = 'mongodb://janpa:asdqwe123@ds123844.mlab.com:23844/randomdb'
const Data = require('./Data');

//  Serveri
// npm install
// node app.js

mongo.connect(url);
app.use(index);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server); 

io.on("connection", socket => {
    console.log("New client connected"),

      app.route('/data').post(function (req, res) {
      const data = new Data(req.body);
      cpuUsage = req.body.cpuUsage;
      freeMem = req.body.freeMem;
      sysTime = req.body.sysTime;
      getDataAndEmit(socket);
      data.save()
        .then(data => {
          res.json('User added successfully');
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  const getDataAndEmit = async socket => {     
      socket.emit("cpu", cpuUsage)
      socket.emit("mem", freeMem)
      socket.emit("time", sysTime)   
  };

  server.listen(port, () => console.log(`Listening on port ${port}`));