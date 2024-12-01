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
import sequelize from '../../config/dbConfig.js';


export const renderActualizarAdmin = (req, res) => {
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
 
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Admin Prueba',
          role: 'admin', // O 'admin' según tus necesidades
      };
  }
  
  
  // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }
/*
  if (user.role == 'user') {
    return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
  }*/
    res.render("admin/actualizarAdmin", { title: "Actualizar datos", user: user });
};

export const renderCrearCurso = (req, res) => {
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
 
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Admin prueba',
          role: 'admin', // O 'admin' según tus necesidades
      };
  }
  
  // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }
/*
  if (user.role == 'user') {
    return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
  }*/
    res.render("admin/crearCurso", { title: "Crear curso", user: user });
};

export const renderCrearExamenPage = (req, res) => {
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
 
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Admin prueba',
          role: 'admin', // O 'admin' según tus necesidades
      };
  }
  
  // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }
/*
  if (user.role == 'user') {
    return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
  }*/
    res.render("admin/crearExamen", { title: "Crear examen", user: user });
};


export const renderCrearPregunta = (req, res) => {
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
 
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Admin prueba',
          role: 'admin', // O 'admin' según tus necesidades
      };
  }
  
  // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }
/*
  if (user.role == 'user') {
    return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
  }*/
  const id = req.params.id; // Obtiene el ID de los parámetros de la ruta
  res.render('admin/crearPregunta', { id, user: user }); // Pasa el ID a la vista
};




export const renderCrearUsuario = (req, res) => {
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
 
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Admin prueba',
          role: 'admin', // O 'admin' según tus necesidades
      };
  }
  
  // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }
/*
  if (user.role == 'user') {
    return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
  }*/
    res.render("admin/crearUsuario", { title: "Crear usuario", user: user });
};

export const renderCursos = async (req, res) => {
  try {
    let user = req.session.user;

    // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
   
    if (!user) {
        user = {
            id: 0, // ID ficticio
            email: 'test@example.com',
            username: 'Admin prueba',
            role: 'admin', // O 'admin' según tus necesidades
        };
    }
    
    // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
    if (!user) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
/*
    if (user.role == 'user') {
      return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
    }*/
    const cursos = await Materia.findAll();
    res.render("admin/cursos", { cursos, user: user });
  } catch (error) {
    console.error("Error al obtener materias:", error);
    res.status(500).json({ message: "Error al obtener materias" });
  }
};


// POR COMPLETAR
export const renderEditarCurso = async (req, res) => {
  try {
    let user = req.session.user;

    // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
   
    if (!user) {
        user = {
            id: 0, // ID ficticio
            email: 'test@example.com',
            username: 'Admin prueba',
            role: 'admin', // O 'admin' según tus necesidades
        };
    }
    
    // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
    if (!user) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
/*
    if (user.role == 'user') {
      return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
    }*/
    const materiaId = req.params.id; 
    const materia = await Materia.findByPk(materiaId); 

    if (!materia) {
        return res.status(404).send("materia no encontrado");
    }

    res.render("admin/editarCurso", { materia, title: "Editar Curso", user: user });
} catch (error) {
    console.error("Error al renderizar la página de edición de materia:", error);
    res.status(500).send("Error interno del servidor");
}};




export const renderEditarExamen = async (req, res) => {
    try {
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
        const examId = req.params.id; 
        const exam = await Exam.findByPk(examId); 

        if (!exam) {
            return res.status(404).send("Examen no encontrado");
        }

        res.render("admin/editarExamen", { exam, title: "Editar Examen", user: user });
    } catch (error) {
        console.error("Error al renderizar la página de edición de examen:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// POR COMPLETAR
export const renderEditarUsuario = async (req, res) => {
    try {
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
        user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
        const userId = req.params.id; 
        const Editaruser = await User.findByPk(userId); 
        
        if (!Editaruser) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.render("admin/editarUsuario", { Editaruser, title: "Editar Usuario", user: user });
    } catch (error) {
        console.error("Error al renderizar la página de edición de usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderExamenes = async (req, res) => {
    try {
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
      
      const exams = await Exam.findAll(); // Obtener todos los exámenes
      res.render('admin/examenes', { exams, user: user }); // Renderizar la vista y pasar los datos
    } catch (error) {
      console.error("Error al obtener exámenes:", error);
      res.status(500).json({ message: "Error al obtener exámenes" });
    }
};

// POR COMPLETAR Y MUCHOOOO
export const renderPreguntasPage = async (req, res) => {
    try {
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
      const exams = await Exam.findAll(); // Obtener todos los exámenes
      res.render('admin/preguntas', { exams, user: user }); // Renderizar la vista y pasar los datos
    } catch (error) {
      console.error("Error al obtener exámenes:", error);
      res.status(500).json({ message: "Error al obtener exámenes" });
    }
};

export const renderVerPreguntasPage = async (req, res) => {
    const { id } = req.params; // Obtener el ID del examen
  
    try {
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
     
  
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
      res.render('admin/verPreguntas', { exam, preguntas: exam.preguntas, user });
    } catch (error) {
      console.error("Error al renderizar la página de preguntas:", error);
      res.status(500).json({ message: "Error al cargar los datos de las preguntas" });
    }
  };
  

  export const renderReglas = async (req, res) => {
    try {

      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/


        // Buscar la regla con id = 1
        const regla = await Reglas.findByPk(1);

        // Verificar si se encontró la regla
        if (!regla) {
            return res.status(404).send("Regla no encontrada.");
        }

        // Renderizar la vista con los datos de la regla
        res.render("admin/reglas", {
            title: "Reglas",
            regla,
            user: user // Enviar la regla encontrada
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
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
        const exam = await Exam.findByPk(id); // Buscar el examen por ID
        if (!exam) return res.status(404).json({ message: "Examen no encontrado" });
  
        res.render('admin/editarExamen', { exam, user: user }); // Renderizar la vista y pasar los datos del examen
    } catch (error) {
        console.error("Error al renderizar la página de edición:", error);
        res.status(500).json({ message: "Error al cargar los datos del examen" });
    }
};

export const renderUsuario = async (req, res) => {
    try {
      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
        user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
      const userT = await User.findAll(); // Obtener todos los exámenes
      res.render('admin/usuarios', { userT, user:user }); // Renderizar la vista y pasar los datos
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
    let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
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
    res.render('admin/verPreguntas', { exam, pregunta: exam.preguntas, user:user });
  } catch (error) {
    console.error("Error al renderizar la página de preguntas:", error);
    res.status(500).json({ message: "Error al cargar los datos de las preguntas" });
  }
};

export const renderVerPreguntasMateria = async (req, res) => {
  const { id } = req.params; // Obtener el ID del Materia

  try {
    let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
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
    res.render('admin/verPreguntasMateria', { materias, pregunta: materias.preguntas, user:user });
  } catch (error) {
    console.error("Error al renderizar la página de preguntas:", error);
    res.status(500).json({ message: "Error al cargar los datos de las preguntas" });
  }
};


export const renderEditarPregunta = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la pregunta de los parámetros
  console.log("ID recibido:", id);

  try {
    let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Admin prueba',
              role: 'admin', // O 'admin' según tus necesidades
          };
      }
      
      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
/*
      if (user.role == 'user') {
        return res.status(401).json({ message: 'No tienes acceso a esta interfaz de administrador' });
      }*/
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
    res.render('admin/editarPregunta', { pregunta, user:user });
  } catch (error) {
    console.error("Error al renderizar la página de edición:", error);
    res.status(500).json({ message: "Error al cargar los datos de la pregunta" });
  }
};


export const renderAdminEstadisticas = async (req, res) => {
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Admin Prueba',
          role: 'admin',
      };
  }

  // Verifica nuevamente si no hay usuario
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }

  try {
      // Consulta a las vistas
      const [aprobadosDesaprobadosResult] = await sequelize.query(
          'SELECT * FROM vista_aprobados_desaprobados', 
          {
              type: sequelize.QueryTypes.SELECT,
          }
      );

      const [distribucionClasificacionesResult] = await sequelize.query(
          'SELECT * FROM vista_distribucion_clasificaciones', 
          {
              type: sequelize.QueryTypes.SELECT,
          }
      );

      const [simulacionesResult] = await sequelize.query(
          'SELECT * FROM vista_simulaciones', 
          {
              type: sequelize.QueryTypes.ROW,
          }
      );

     
     console.log(aprobadosDesaprobadosResult)
     console.log(distribucionClasificacionesResult)
     console.log(simulacionesResult)

      
      // Pasa los datos a la vista
      res.render("admin/adminEstadisticas", {
          title: "Actualizar datos",
          user: user,
          aprobadosDesaprobadosResult,
          distribucionClasificacionesResult,
          simulaciones: simulacionesResult,
      });

  } catch (error) {
      console.error("Error ejecutando las consultas:", error);
      res.status(500).json({ message: 'Error al obtener los datos' });
  }
};

