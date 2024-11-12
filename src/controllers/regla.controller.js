import Reglas from '../models/reglas.js'; // Asegúrate de que la ruta sea correcta

// Crear una nueva regla
export const createRegla = async (req, res) => {
    try {
        const { respuesta_correcta, respuesta_incorrecta, sin_respuesta, puntaje_maximo, tiempo_examen_simulacro } = req.body;
        const nuevaRegla = await Reglas.create({
            respuesta_correcta,
            respuesta_incorrecta,
            sin_respuesta,
            puntaje_maximo,
            tiempo_examen_simulacro,
        });
        res.status(201).json(nuevaRegla);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las reglas
export const getReglas = async (req, res) => {
    try {
        const reglas = await Reglas.findAll();
        res.status(200).json(reglas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una regla por ID
export const getReglaById = async (req, res) => {
    try {
        const { id } = req.params;
        const regla = await Reglas.findByPk(id);
        if (!regla) {
            return res.status(404).json({ message: 'Regla no encontrada' });
        }
        res.status(200).json(regla);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una regla por ID
export const updateRegla = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Reglas.update(req.body, {
            where: { id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Regla no encontrada' });
        }
        const updatedRegla = await Reglas.findByPk(id);
        res.status(200).json(updatedRegla);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una regla por ID
export const deleteRegla = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Reglas.destroy({
            where: { id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Regla no encontrada' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
