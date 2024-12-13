// controllers/activoFijoController.js
const ActivoFijo = require('../models/ActivoFijo');
const TipoActivoFijo = require('../models/TipoActivoFijo');
const Area = require('../models/Area');
const CompanyCliente = require('../models/CompanyCliente');
const Usuario = require('../models/Usuario');

// Obtener todos los activos fijos
const getActivosFijos = async (req, res) => {
  try {
    const activosFijos = await ActivoFijo.findAll();
    res.json(activosFijos);
  } catch (error) {
    console.error('Error al obtener activos fijos:', error);
    res.status(500).json({ message: 'Error al obtener activos fijos.' });
  }
};

// Obtener un activo fijo por ID
const getActivoFijoById = async (req, res) => {
  try {
    const activoFijo = await ActivoFijo.findByPk(req.params.id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado.' });
    }
    res.json(activoFijo);
  } catch (error) {
    console.error('Error al obtener activo fijo:', error);
    res.status(500).json({ message: 'Error al obtener activo fijo.' });
  }
};

// Crear un nuevo activo fijo
const createActivoFijo = async (req, res) => {
  try {
    const { tipo_activo_fijo_id, nombre_activo_fijo, marca, modelo, serial, imei, cpu, ram, tipo_almacenamiento, cantidad_almacenamiento, ubicacion, usuario_correo, contraseña, tipo_conexion, ip, puerto, usuario_responsable, area_id, company_cliente_id, estado, observaciones } = req.body;

    // Validar que el tipo de activo fijo sea válido
    const tipoActivoFijo = await TipoActivoFijo.findByPk(tipo_activo_fijo_id);
    if (!tipoActivoFijo) {
      return res.status(400).json({ message: 'Tipo de activo fijo no válido.' });
    }

    // Validar que la área sea válida
    const area = await Area.findByPk(area_id);
    if (!area) {
      return res.status(400).json({ message: 'Área no válida.' });
    }

    // Validar que el usuario sea válido
    const usuario = await Usuario.findByPk(usuario_correo);
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no válido.' });
    }

    // Validar que la compañía cliente sea válida
    const companyCliente = await CompanyCliente.findByPk(company_cliente_id);
    if (!companyCliente) {
      return res.status(400).json({ message: 'Compañía cliente no válida.' });
    }

    const activoFijo = await ActivoFijo.create({
      tipo_activo_fijo_id,
      nombre_activo_fijo,
      marca,
      modelo,
      serial,
      imei,
      cpu,
      ram,
      tipo_almacenamiento,
      cantidad_almacenamiento,
      ubicacion,
      usuario_correo,
      contraseña,
      tipo_conexion,
      ip,
      puerto,
      usuario_responsable,
      area_id,
      company_cliente_id,
      estado,
      observaciones,
    });

    res.status(201).json(activoFijo);
  } catch (error) {
    console.error('Error al crear activo fijo:', error);
    res.status(500).json({ message: 'Error al crear activo fijo.' });
  }
};

// Actualizar un activo fijo
const updateActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_activo_fijo_id, nombre_activo_fijo, marca, modelo, serial, imei, cpu, ram, tipo_almacenamiento, cantidad_almacenamiento, ubicacion, usuario_correo, contraseña, tipo_conexion, ip, puerto, usuario_responsable, area_id, company_cliente_id, estado, observaciones } = req.body;

    // Validar que el tipo de activo fijo sea válido
    const tipoActivoFijo = await TipoActivoFijo.findByPk(tipo_activo_fijo_id);
    if (!tipoActivoFijo) {
      return res.status(400).json({ message: 'Tipo de activo fijo no válido.' });
    }

    // Validar que la área sea válida
    const area = await Area.findByPk(area_id);
    if (!area) {
      return res.status(400).json({ message: 'Área no válida.' });
    }

    // Validar que el usuario sea válido
    const usuario = await Usuario.findByPk(usuario_correo);
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no válido.' });
    }

    // Validar que la compañía cliente sea válida
    const companyCliente = await CompanyCliente.findByPk(company_cliente_id);
    if (!companyCliente) {
      return res.status(400).json({ message: 'Compañía cliente no válida.' });
    }

    const activoFijo = await ActivoFijo.findByPk(id);
    if (!activoFijo) {
      return res.status(404).json({ message: 'Activo fijo no encontrado.' });
    }

    // Validar que el activo fijo esté en la área
    if (activoFijo.area_id !== area_id) {
      return res.status(400).json({ message: 'Activo fijo no pertenece a la área.' });
    }

    // Validar que el activo fijo esté asociado al usuario
    if (activoFijo.usuario_correo !== usuario_correo) {
      return res.status(400).json({ message: 'Activo fijo no está asociado al usuario.' });
    }

    // Validar que el activo fijo esté asociado a la compañía cliente
    if (activoFijo.company_cliente_id !== company_cliente_id) {
      return res.status(400).json({ message: 'Activo fijo no está asociado a la compañía cliente.' });
    }

    // Validar que el activo fijo esté en estado 'activo'
    if (activoFijo.estado !== 'activo') {
      return res.status(400).json({ message: 'Activo fijo no está en estado activo.' });
    }

    activoFijo.tipo_activo_fijo_id = tipo_activo_fijo_id || activoFijo.tipo_activo_fijo_id;
    activoFijo.nombre_activo_fijo = nombre_activo_fijo || activoFijo.nombre_activo_fijo;
    activoFijo.marca = marca || activoFijo.marca;
    activoFijo.modelo = modelo || activoFijo.modelo;
    activoFijo.serial = serial || activoFijo.serial;
    activoFijo.imei = imei || activoFijo.imei;
    activoFijo.cpu = cpu || activoFijo.cpu;
    activoFijo.ram = ram || activoFijo.ram;
    activoFijo.tipo_almacenamiento = tipo_almacenamiento || activoFijo.tipo_almacenamiento;
    activoFijo.cantidad_almacenamiento = cantidad_almacenamiento || activoFijo.cantidad_almacenamiento;
    activoFijo.ubicacion = ubicacion || activoFijo.ubicacion;
    activoFijo.usuario_correo = usuario_correo || activoFijo.usuario_correo;
    activoFijo.contraseña = contraseña || activoFijo.contraseña;
    activoFijo.tipo_conexion = tipo_conexion || activoFijo.tipo_conexion;
    activoFijo.ip = ip || activoFijo.ip;
    activoFijo.puerto = puerto || activoFijo.puerto;
    activoFijo.usuario_responsable = usuario_responsable || activoFijo.usuario_responsable;
    activoFijo.area_id = area_id || activoFijo.area_id;
    activoFijo.company_cliente_id = company_cliente_id || activoFijo.company_cliente_id;
    activoFijo.estado = estado || activoFijo.estado;
    activoFijo.observaciones = observaciones || activoFijo.observaciones;

    await activoFijo.save();
    res.json({ message: 'Activo fijo actualizado con éxito.', activoFijo });
  } catch (error) {
    console.error('Error al actualizar activo fijo:', error);
    res.status(500).json({ message: 'Error al actualizar activo fijo.' });
  }
};

// Eliminar un activo fijo
const deleteActivoFijo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ActivoFijo.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Activo fijo no encontrado.' });
    }

    res.json({ message: 'Activo fijo eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar activo fijo:', error);
    res.status(500).json({ message: 'Error al eliminar activo fijo.' });
  }
};

module.exports = {
  getActivosFijos,
  getActivoFijoById,
  createActivoFijo,
  updateActivoFijo,
  deleteActivoFijo,
};