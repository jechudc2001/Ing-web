import sequelize from '../../config/dbConfig.js';

export const getAprobadosDesaprobados = async (req, res) => {
    try {
      const datos = await sequelize.query('SELECT * FROM vista_aprobados_desaprobados', {
        type: sequelize.QueryTypes.SELECT,
      });
      res.status(200).json(datos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getDistribucionClasificaciones = async (req, res) => {
    try {
      const datos = await sequelize.query('SELECT * FROM vista_distribucion_clasificaciones', {
        type: sequelize.QueryTypes.SELECT,
      });
      res.status(200).json(datos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getSimulaciones = async (req, res) => {
    try {
      const datos = await sequelize.query('SELECT * FROM vista_simulaciones', {
        type: sequelize.QueryTypes.SELECT,
      });
      res.status(200).json(datos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const obtenerEstadisticasPorUsuario = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const estadisticas = await sequelize.query('CALL obtener_estadisticas_por_usuario(:usuarioId)', {
        replacements: { usuarioId },
      });
      res.status(200).json(estadisticas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const spAprobadosDesaprobados = async (req, res) => {
    try {
    const { usuarioId } = req.params;

      const resultados = await sequelize.query('CALL sp_aprobados_desaprobados(:usuarioId)', {
        replacements: { usuarioId },
      });
      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
export const spSimulacionesPorUsuario = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const simulaciones = await sequelize.query('CALL sp_simulaciones_por_usuario(:usuarioId)', {
        replacements: { usuarioId },
      });
      res.status(200).json(simulaciones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  




  








