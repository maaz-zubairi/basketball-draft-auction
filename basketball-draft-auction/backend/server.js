require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const playerRoutes = require('./routes/playerRoutes');
const captainRoutes = require('./routes/captainRoutes');
const logRoutes = require("./routes/logRoutes"); // Include the log route

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(cors());
app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/captains', captainRoutes);
app.use("/api/logs", logRoutes); // Add the logs API route

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('placeBid', (data) => {
    io.emit('updateBid', data);
  });

  socket.on('endAuction', (data) => {
    io.emit('auctionEnded', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
