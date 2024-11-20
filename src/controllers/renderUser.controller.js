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
import Sequelize from 'sequelize';



export const renderUserDashboard = async (req, res) => {
    try {

        if (!req.session.user) {
            return res.status(401).json({ message: 'No estás autenticado' });
        }

        // Obtén todos los canales con sus materias correspondientes
        const canales = await Canal.findAll({
            include: Materia ,
        });
        
        const user = req.session.user;
        
        // Renderiza la vista con los datos procesados
        res.render('user/userDashboard', {
            title: 'Panel de usuario',
            canales: canales,
            user: user, 
        });
    } catch (error) {
        console.error('Error al obtener los canales:', error);
        res.status(500).send('Error interno del servidor');
    }
};



export const renderUserSeleccionarExamen = async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'No estás autenticado' });
      }
      // Obtén la ID del canal desde los parámetros de la ruta
      const { id } = req.params;
  
      // Busca los exámenes relacionados con el canal
      const examenes = await Exam.findAll({
        where: { canal: id } // Filtro por el canal correspondiente
      });
      const user = req.session.user;

      // Renderiza la vista, pasando los exámenes como datos
      res.render("user/userSeleccionarExamen", { 
        title: "Seleccionar Examen",
        examenes,
        user: user, 

      });
    } catch (error) {
      console.error("Error al obtener los exámenes:", error);
      res.status(500).send("Ocurrió un error al obtener los exámenes");
    }
  };

export const renderUserCuenta= (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    const user = req.session.user;

    res.render("user/userCuenta", { title: "Cuenta", user: user,  } );
};

export const renderUserModoPractica= (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No estás autenticado' });
  }
  const user = req.session.user;

  res.render("user/userModoPractica", { title: "XD",user: user,  });
};


export const renderUserModoPracticaCurso = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    // Obtener el ID de la materia y la cantidad de preguntas de los parámetros
    const { id, cantidad } = req.params;

    // Convertir la cantidad a un número (en caso de que venga como string)
    const cantidadPreguntas = parseInt(cantidad);

    // Obtener las preguntas de forma aleatoria junto con sus alternativas
    const preguntas = await Pregunta.findAll({
      where: { id_materia: id }, // Filtramos por ID de materia
      limit: cantidadPreguntas,  // Limitamos la cantidad de preguntas obtenidas
      order: Sequelize.literal('RAND()'), // Esto asegura que las preguntas sean aleatorias
      include: {
        model: Alternativa,
        as: 'alternativas', // Alias para las alternativas relacionadas
        required: false // Permite que si no tiene alternativas también se devuelvan las preguntas
      }
    });
    const user = req.session.user;

    // Renderiza la vista con las preguntas y sus alternativas obtenidas
    res.render("user/userPracticaCurso", { 
      title: "Modo de Práctica", 
      preguntas,
      user: user, 
    });
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    res.status(500).send("Ocurrió un error al obtener las preguntas");
  }
};


export const renderUserCursos = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    // Obtén todos los cursos desde la base de datos
    const cursos = await Materia.findAll();
    const user = req.session.user;

    // Renderiza la vista, pasando los cursos como datos
    res.render("user/userCursos", {
      title: "Cursos",
      cursos,
      user: user, 
    });
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const renderPaginaWeb= (req, res) => {
  

  res.render("index", { title: "SIMULA UNJBG" }
  );
};

export const renderUserModoSimulacro= (req, res) => {
  
  if (!req.session.user) {
    return res.status(401).json({ message: 'No estás autenticado' });
  }
  // Obtén todos los cursos desde la base de datos
  const user = req.session.user;
  res.render("user/userModoSimulacro", { title: "Modo Simulacro",user:user }
  );
};
