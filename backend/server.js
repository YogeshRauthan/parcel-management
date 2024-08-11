const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Database connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database.');
// });

// Routes
// app.get('/api/parcels', (req, res) => {
//   db.query('SELECT * FROM parcels', (err, results) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(results);
//   });
// });

// app.post('/api/parcels', (req, res) => {
//   const { name, source, destination } = req.body;
//   db.query(
//     'INSERT INTO parcels (name, source, destination, status) VALUES (?, ?, ?, ?)',
//     [name, source, destination, 'Pending'],
//     (err, result) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       const newParcel = { id: result.insertId, name, source, destination, status: 'Pending' };
//       io.emit('newParcel', newParcel);
//       res.status(201).json(newParcel);
//     }
//   );
// });

// Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('addParcel', (data) => {
    console.log('Parcel aaded socket recieved ', data);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));