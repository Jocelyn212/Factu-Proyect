require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./mongo-config');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Rutas
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


