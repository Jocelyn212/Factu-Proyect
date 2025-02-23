const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
    process.exit(1); // Termina el proceso si no puede conectarse
});

// Rutas
const userRoutes = require('./routes/users'); // Importa las rutas de usuarios
const clientRoutes = require('./routes/clients');

app.use('/api/users', userRoutes); // Usa las rutas
app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


