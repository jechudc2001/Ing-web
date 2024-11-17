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


export const renderActualizarAdmin = (req, res) => {
    res.render("admin/actualizarAdmin", { title: "XD" });
};

export const renderCrearCurso = (req, res) => {
    res.render("admin/crearCurso", { title: "XD" });
};

export const renderCrearExamenPage = (req, res) => {
    res.render("admin/crearExamen", { title: "XD" });
};


export const renderCrearPregunta = (req, res) => {
  const id = req.params.id; // Obtiene el ID de los parámetros de la ruta
  res.render('admin/crearPregunta', { id }); // Pasa el ID a la vista
};




export const renderCrearUsuario = (req, res) => {
    res.render("admin/crearUsuario", { title: "XD" });
};

export const renderCursos = async (req, res) => {
  try {
    const cursos = await Materia.findAll();
    res.render("admin/cursos", { cursos });
  } catch (error) {
    console.error("Error al obtener materias:", error);
    res.status(500).json({ message: "Error al obtener materias" });
  }
};


// POR COMPLETAR
export const renderEditarCurso = async (req, res) => {
  try {
    const materiaId = req.params.id; 
    const materia = await Materia.findByPk(materiaId); 

    if (!materia) {
        return res.status(404).send("materia no encontrado");
    }

    res.render("admin/editarCurso", { materia, title: "Editar Curso" });
} catch (error) {
    console.error("Error al renderizar la página de edición de materia:", error);
    res.status(500).send("Error interno del servidor");
}};




export const renderEditarExamen = async (req, res) => {
    try {
        const examId = req.params.id; 
        const exam = await Exam.findByPk(examId); 

        if (!exam) {
            return res.status(404).send("Examen no encontrado");
        }

        res.render("admin/editarExamen", { exam, title: "Editar Examen" });
    } catch (error) {
        console.error("Error al renderizar la página de edición de examen:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// POR COMPLETAR
export const renderEditarUsuario = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await User.findByPk(userId); 
        
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.render("admin/editarUsuario", { user, title: "Editar Usuario" });
    } catch (error) {
        console.error("Error al renderizar la página de edición de usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderExamenes = async (req, res) => {
    try {
      const exams = await Exam.findAll(); // Obtener todos los exámenes
      res.render('admin/examenes', { exams }); // Renderizar la vista y pasar los datos
    } catch (error) {
      console.error("Error al obtener exámenes:", error);
      res.status(500).json({ message: "Error al obtener exámenes" });
    }
};

// POR COMPLETAR Y MUCHOOOO
export const renderPreguntasPage = async (req, res) => {
    try {
      const exams = await Exam.findAll(); // Obtener todos los exámenes
      res.render('admin/preguntas', { exams }); // Renderizar la vista y pasar los datos
    } catch (error) {
      console.error("Error al obtener exámenes:", error);
      res.status(500).json({ message: "Error al obtener exámenes" });
    }
};

export const renderVerPreguntasPage = async (req, res) => {
    const { id } = req.params; // Obtener el ID del examen
  
    try {
  
      // Buscar el examen por ID e incluir las preguntas relacionadas
      const exam = await Exam.findByPk(id, {
        include: {
          model: Pregunta,
          as: 'preguntas', // Match this alias with the one in the association
        },
      });
      
  
      if (!exam) {
        return res.status(404).json({ message: "Examen no encontrado" });
      }   
      
  
      // Renderizar la vista 'verpreguntas' y pasar los datos del examen y las preguntas
      res.render('admin/verPreguntas', { exam, preguntas: exam.preguntas });
    } catch (error) {
      console.error("Error al renderizar la página de preguntas:", error);
      res.status(500).json({ message: "Error al cargar los datos de las preguntas" });
    }
  };
  

  export const renderReglas = async (req, res) => {
    try {
        // Buscar la regla con id = 1
        const regla = await Reglas.findByPk(1);

        // Verificar si se encontró la regla
        if (!regla) {
            return res.status(404).send("Regla no encontrada.");
        }

        // Renderizar la vista con los datos de la regla
        res.render("admin/reglas", {
            title: "Reglas",
            regla // Enviar la regla encontrada
        });
    } catch (error) {
        console.error("Error al obtener la regla:", error);
        res.status(500).send("Error interno del servidor.");
    }
};


  
export const renderEditExamPage = async (req, res) => {
    const { id } = req.params; // Obtener el ID del examen de los parámetros
  
    console.log("ID recibido:", id); // Agregar esta línea para verificar el ID
  
    try {
        const exam = await Exam.findByPk(id); // Buscar el examen por ID
        if (!exam) return res.status(404).json({ message: "Examen no encontrado" });
  
        res.render('admin/editarExamen', { exam }); // Renderizar la vista y pasar los datos del examen
    } catch (error) {
        console.error("Error al renderizar la página de edición:", error);
        res.status(500).json({ message: "Error al cargar los datos del examen" });
    }
};

export const renderUsuario = async (req, res) => {
    try {
      const user = await User.findAll(); // Obtener todos los exámenes
      res.render('admin/usuarios', { user }); // Renderizar la vista y pasar los datos
    } catch (error) {
      console.error("Error al obtener ususers:", error);
      res.status(500).json({ message: "Error al obtener ususers" });
    }
};


export const createPregunta = async (req, res) => {
  try {
    const { materia, texto, img, alternativas, id_exam } = req.body;  // Incluye 'alternativas'
    const exam = await Exam.findByPk(id_exam); // Verificar que el examen exista
    if (!exam) return res.status(404).json({ message: "Examen no encontrado" });

    const newPregunta = await Pregunta.create({ materia, texto, img, alternativas, id_exam });
    res.status(201).json(newPregunta); // Retornar la nueva pregunta creada
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    res.status(500).json({ message: "Error al crear la pregunta" });
  }
};


export const renderManagePreguntasPage = async (req, res) => {
  const { id } = req.params; // Obtener el ID del examen

  try {
    // Buscar el examen por ID e incluir las preguntas relacionadas y sus alternativas
    const exam = await Exam.findByPk(id, {
      include: {
        model: Pregunta,
        as: 'preguntas', // Alias para las preguntas relacionadas
        include: {
          model: Alternativa,
          as: 'alternativas', // Alias para las alternativas relacionadas
        }
      },
    });

    if (!exam) {
      return res.status(404).json({ message: "Examen no encontrado" });
    }    
    // Renderizar la vista 'verPreguntas' y pasar los datos del examen y las preguntas con sus alternativas
    res.render('admin/verPreguntas', { exam, pregunta: exam.preguntas });
  } catch (error) {
    console.error("Error al renderizar la página de preguntas:", error);
    res.status(500).json({ message: "Error al cargar los datos de las preguntas" });
  }
};

export const renderVerPreguntasMateria = async (req, res) => {
  const { id } = req.params; // Obtener el ID del Materia

  try {
    // Buscar el Materia por ID e incluir las preguntas relacionadas y sus alternativas
    const materias = await Materia.findByPk(id, {
      include: {
        model: Pregunta,
        as: 'preguntas', // Alias para las preguntas relacionadas
        include: {
          model: Alternativa,
          as: 'alternativas', // Alias para las alternativas relacionadas
        }
      },
    });

    if (!materias) {
      return res.status(404).json({ message: "Materia no encontrado" });
    }    
    // Renderizar la vista 'verPreguntas' y pasar los datos del Materia y las preguntas con sus alternativas
    res.render('admin/verPreguntasMateria', { materias, pregunta: materias.preguntas });
  } catch (error) {
    console.error("Error al renderizar la página de preguntas:", error);
    res.status(500).json({ message: "Error al cargar los datos de las preguntas" });
  }
};


export const renderEditarPregunta = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la pregunta de los parámetros
  console.log("ID recibido:", id);

  try {
    // Buscar la pregunta por ID e incluir las alternativas relacionadas
    const pregunta = await Pregunta.findByPk(id, {
      include: {
        model: Alternativa,
        as: 'alternativas', // Alias para las alternativas relacionadas
      }
    });

    // Verificar si la pregunta existe
    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    // Renderizar la vista de edición y pasar los datos de la pregunta y sus alternativas
    res.render('admin/editarPregunta', { pregunta });
  } catch (error) {
    console.error("Error al renderizar la página de edición:", error);
    res.status(500).json({ message: "Error al cargar los datos de la pregunta" });
  }
};



