/* const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
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
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)); */

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err);
    process.exit(1); // Termina el proceso si no puede conectarse
  });

// Ruta de prueba en la raíz
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Importar rutas
const userRoutes = require("./routes/users");
const clientRoutes = require("./routes/clients");
const budgetRoutes = require('./routes/budgets');
const invoiceRoutes = require('./routes/invoices');


app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/invoices', invoiceRoutes);

// Puerto para desarrollo local
const PORT = process.env.PORT || 3000;

// Verifica si el archivo se ejecuta directamente o si es importado (para Vercel)
if (require.main === module) {
  app.listen(PORT, () => console.log(`🎧 Servidor corriendo en http://localhost:${PORT}`));
}

// Exportar la app para que Vercel la maneje
module.exports = app;

