import Exam from '../models/exam.js';
import Canal from '../models/canal.js';
import ExamType from '../models/examType.js';
import Materia from '../models/materia.js';
import Pregunta from '../models/pregunta.js';
import Reglas from '../models/reglas.js'; 
import Simulation from '../models/simulation.js';
import SimulationResult from '../models/simulation_result.js';
import User from '../models/user.js';
import Alternativa from '../models/alternativa.js';
import canalMateria from '../models/canalMateria.js';



export const renderUserDashboard = async (req, res) => {
    try {
        // Obtén todos los canales con sus materias correspondientes
        const canales = await Canal.findAll({
            include: Materia ,
        });
        
        
        canales.forEach(canal => console.log(canal.toJSON()));
        
        // Renderiza la vista con los datos procesados
        res.render('user/userDashboard', {
            title: 'XD',
            canales: canales,
        });
    } catch (error) {
        console.error('Error al obtener los canales:', error);
        res.status(500).send('Error interno del servidor');
    }
};



export const renderUserSeleccionarExamen = async (req, res) => {
    try {
      // Obtén la ID del canal desde los parámetros de la ruta
      const { id } = req.params;
  
      // Busca los exámenes relacionados con el canal
      const examenes = await Exam.findAll({
        where: { canal: id } // Filtro por el canal correspondiente
      });
  
      // Renderiza la vista, pasando los exámenes como datos
      res.render("user/userSeleccionarExamen", { 
        title: "Seleccionar Examen",
        examenes 
      });
    } catch (error) {
      console.error("Error al obtener los exámenes:", error);
      res.status(500).send("Ocurrió un error al obtener los exámenes");
    }
  };

export const renderUserCuenta= (req, res) => {
    res.render("user/userCuenta", { title: "XD" });
};

export const renderUserModoPractica= (req, res) => {
    res.render("user/userModoPractica", { title: "XD" });
};
