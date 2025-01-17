// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const areaRoutes = require('./routes/areaRoutes');
const companyClienteRoutes = require('./routes/companyClienteRoutes');
const emailConfigRoutes = require('./routes/emailConfig');
const authRoutes = require('./routes/authRoutes');
const activoFijoRoutes = require('./routes/activoFijoRoutes');
const registroActivoRoutes = require('./routes/registroActivoRoutes');
const tipoActivoFijoRoutes = require('./routes/tipoActivoFijoRoutes');
const usuarioCompanyClienteRoutes = require('./routes/usuarioCompanyClienteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/company-clientes', companyClienteRoutes);
app.use('/api', emailConfigRoutes);
app.use('/api/activos-fijos', activoFijoRoutes);
app.use('/api/registros-activos', registroActivoRoutes);
app.use('/api/tipos-activos-fijos', tipoActivoFijoRoutes);
app.use('/api/usuarios-companies-clientes', usuarioCompanyClienteRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});