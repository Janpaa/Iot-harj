const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const faker = require("faker");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const mongo = require("mongoose");
const app = express();
const url = 'mongodb://janpa:asdqwe123@ds123844.mlab.com:23844/randomdb'

mongo.connect(url)
app.use(index);

const Data = mongo.model('Data', {
    content: Number,
    date: Date,
  })

const server = http.createServer(app);
const io = socketIo(server); 

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
      () => getDataAndEmit(socket),
      1000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
  const getDataAndEmit = async socket => {
         var value = faker.random.number(50);
         const data = new Data({
            content: value,
            date: new Date(),
          })
          data
            .save()
         socket.emit("randomData", value)
  };
  server.listen(port, () => console.log(`Listening on port ${port}`));