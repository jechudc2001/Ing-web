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


import sequelize from '../../config/dbConfig.js';



export const renderUserDashboard = async (req, res) => {
    try {

      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Usuario Prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }

      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }

        // Obtén todos los canales con sus materias correspondientes
        const canales = await Canal.findAll({
            include: Materia ,
        });
        
       
        
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

      let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Usuario Prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }

      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
      // Obtén la ID del canal desde los parámetros de la ruta
      const { id } = req.params;
  
      // Busca los exámenes relacionados con el canal
      const examenes = await Exam.findAll({
        where: { canal: id } // Filtro por el canal correspondiente
      });

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
  let user = req.session.user;

  // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
 
  if (!user) {
      user = {
          id: 0, // ID ficticio
          email: 'test@example.com',
          username: 'Usuario Prueba',
          role: 'user', // O 'admin' según tus necesidades
      };
  }

  // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }

    res.render("user/userCuenta", { title: "Cuenta", user: user,  } );
};


export const renderUserModoPractica = async (req, res) => {
  let user = req.session.user;

  // Asignar un usuario de prueba si no hay autenticación y estás en producción
  if (!user) {
    user = {
      id: 0,
      email: 'test@example.com',
      username: 'Usuario Prueba',
      role: 'user', // Cambia según tus necesidades
    };
  }

  // Verifica nuevamente si no hay usuario
  if (!user) {
    return res.status(401).render('error', { message: 'No estás autenticado' });
  }

  // Obtener la ID del examen desde la URL
  const examId = req.params.id;

  try {
    // Buscar el examen por ID y sus relaciones
    const exam = await Exam.findByPk(examId, {
      include: {
        model: Pregunta,
        as: 'preguntas', // Alias configurado en tus asociaciones
        include: {
          model: Alternativa,
          as: 'alternativas', // Alias configurado en tus asociaciones
        },
      },
    });

    // Verificar si el examen existe
    if (!exam) {
      return res.status(404).render('error', { message: 'Examen no encontrado' });
    }

    // Renderizar la página de práctica con los datos del examen
    res.render('user/userModoPractica', {
      title: 'Modo Práctica',
      user: user,
      exam: exam, // El examen con sus preguntas y alternativas
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al cargar el examen:', error);
    res.status(500).render('error', { message: 'Error al cargar el examen' });
  }
};



export const renderUserModoPracticaCurso = async (req, res) => {
  try {
    let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Usuario Prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }

      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
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
    let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Usuario Prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }

      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
    // Obtén todos los cursos desde la base de datos
    const cursos = await Materia.findAll();

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

export const renderUserModoSimulacro= async (req, res) => {
  
  let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Usuario Prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }

      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
      const examId = req.params.id;

      try {
        const reglas = await Reglas.findByPk(1);

        // Buscar el examen por ID y sus relaciones
        const exam = await Exam.findByPk(examId, {
          include: {
            model: Pregunta,
            as: 'preguntas', // Alias configurado en tus asociaciones
            include: {
              model: Alternativa,
              as: 'alternativas', // Alias configurado en tus asociaciones
            },
          },
        });
    
        // Verificar si el examen existe
        if (!exam) {
          return res.status(404).render('error', { message: 'Examen no encontrado' });
        }
    
        // Renderizar la página de práctica con los datos del examen
        res.render('user/userModoSimulacro', {
          title: 'Modo Simulacro',
          user: user,
          exam: exam,
          reglas // El examen con sus preguntas y alternativas
        });
      } catch (error) {
        // Manejo de errores
        console.error('Error al cargar el examen:', error);
        res.status(500).render('error', { message: 'Error al cargar el examen' });
      }
};
export const renderUserCalificacion = async (req, res) => {
  let user = req.session.user;

  if (!user) {
      user = {
          id: 0,
          email: 'test@example.com',
          username: 'Usuario Prueba',
          role: 'user',
      };
  }

  const { id } = req.params; // ID de la simulación pasada en la URL

  try {
      // Obtener la simulación
      const simulation = await Simulation.findOne({
          where: { id_simulation: id },
          attributes: ['id_simulation', 'puntaje_total']
      });

      if (!simulation) {
          return res.status(404).json({ message: 'Simulación no encontrada' });
      }

      // Obtener resultados de la simulación
      const results = await SimulationResult.findAll({
          where: { id_simulation: id },
          include: [
              {
                  model: Pregunta,
                  attributes: ['id_materia'],
              },
          ],
      });

      console.log(JSON.stringify(results, null, 2));  // Esto te dará una vista detallada de la estructura completa

      // Agrupar por materia y calcular estadísticas
      const statsByMateria = results.reduce((stats, result) => {
          const idMateria = result.Preguntum.id_materia;
          if (!stats[idMateria]) {
              stats[idMateria] = {
                  preguntas: 0,
                  correctas: 0,
                  incorrectas: 0,
                  puntaje: 0,  // Asegurémonos de que puntaje se inicie como un número
              };
          }
          stats[idMateria].preguntas += 1;

          // Lógica para ajustar el puntaje
          if (result.respuesta_seleccionada === null) {
              // Si no se seleccionó una respuesta
              stats[idMateria].puntaje += 1;  // Puntaje por no responder
          } else if (result.es_correcta) {
              // Si la respuesta es correcta
              stats[idMateria].correctas += 1;
              stats[idMateria].puntaje += parseFloat(result.puntaje);  // Aseguramos que el puntaje se maneje como número
          } else {
              // Si la respuesta es incorrecta
              stats[idMateria].incorrectas += 1;
              stats[idMateria].puntaje -= 1.25;  // Puntaje negativo por incorrecta
          }

          return stats;
      }, {});

      // Definir los nombres de las materias
      const materiaNames = {
        1: "Razonamiento Verbal",
        2: "Razonamiento Matemático",
        3: "Realidad Nacional",
        4: "Aritmética y Álgebra",
        5: "Geometría y Trigonometría",
        6: "Física",
        7: "Química",
        8: "Biología",
        9: "Historia",
        10: "Economía",
        11: "Geografía",
        12: "Literatura",
        13: "Lenguaje",
        14: "Lógica"
      };

      // Función para obtener el nombre de la materia
      const getMateriaName = (id) => materiaNames[id] || "Materia desconocida";

      // Mapeando los resultados y usando getMateriaName
      const dataForView = Object.entries(statsByMateria).map(([idMateria, stats]) => ({
        materia: idMateria,
        nombreMateria: getMateriaName(idMateria),  // Utilizando la función para obtener el nombre
        ...stats,
      }));

      // Renderizar la vista con los datos calculados
      res.render('user/userCalificacion', {
          title: "Calificación",
          user,
          simulation,
          dataForView,
      });

  } catch (error) {
      console.error('Error al obtener calificaciones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};




export const renderUserGenerarAleatorio= (req, res) => {
  
  let user = req.session.user;

      // Si no hay usuario autenticado y estás en producción, asigna un usuario de prueba
     
      if (!user) {
          user = {
              id: 0, // ID ficticio
              email: 'test@example.com',
              username: 'Usuario Prueba',
              role: 'user', // O 'admin' según tus necesidades
          };
      }

      // Verifica nuevamente si no hay usuario (en caso de no estar en producción)
      if (!user) {
          return res.status(401).json({ message: 'No estás autenticado' });
      }
  // Obtén todos los cursos desde la base de datos
  res.render("user/userGenerarAleatorio", { title: "Calificacion",user:user }
  );
};





export const renderUserRespuestas = async (req, res) => {
  let user = req.session.user;

  // Asignar un usuario de prueba si no hay autenticación y estás en producción
  if (!user) {
    user = {
      id: 0,
      email: 'test@example.com',
      username: 'Usuario Prueba',
      role: 'user',
    };
  }

  // Verificar si el usuario está autenticado
  if (!user) {
    return res.status(401).render('error', { message: 'No estás autenticado' });
  }

  // Obtener id_simulation desde los parámetros
  const { id } = req.params; // ID de la simulación pasada en la URL

  try {
    // Obtener la simulación
    const simulation = await Simulation.findByPk(id, {
      attributes: ['id_simulation', 'id_exam', 'puntaje_total', 'fecha_realizacion'],
    });

    // Verificar si la simulación existe
    if (!simulation) {
      return res.status(404).render('error', { message: 'Simulación no encontrada' });

    }

    // Obtener los resultados de la simulación
    const results = await SimulationResult.findAll({
      where: { id_simulation: id },
      attributes: ['id_simulation_result', 'id_pregunta', 'respuesta_seleccionada', 'es_correcta', 'puntaje'],
    });

    // Obtener las preguntas y solo las alternativas correctas relacionadas con el examen
    const examen = await Exam.findByPk(simulation.id_exam, {
      attributes: ['id_exam', 'canal', 'exam_type', 'year'],
      include: {
        model: Pregunta,
        as: 'preguntas', // Alias configurado en las asociaciones
        include: {
          model: Alternativa,
          as: 'alternativas', // Alias configurado en las asociaciones
        },
      },
    });

    // Verificar si el examen existe
    if (!examen) {
      //return res.status(404).render('error', { message: 'Examen no encontrado' });
      console.log("xdxd");
    }

    console.log(results);
    console.log("esta tiene que ser el examen, la cosa de abajo");
    console.log(examen);

    // Renderizar la página con los datos obtenidos
    
    res.render("user/userRespuestas", { 
      title: "Calificacion",
      user: user,
      results: results,
      examen: examen,
      simulation: simulation
      })
  


  } catch (error) {
    console.error('Error al cargar las respuestas del usuario:', error);
    res.status(500).render('error', { message: 'Error al cargar las respuestas del usuario' });
  }
};

export const renderUserEstadisticas = async (req, res) => {
  let user = req.session.user;

  // If no user is authenticated and you're in production, assign a test user
  if (!user) {
      user = {
          id: 0, // Fictitious ID
          email: 'test@example.com',
          username: 'Usuario Prueba',
          role: 'user', // Or 'admin' based on your needs
      };
  }

  // If there's still no user, return an unauthorized status
  if (!user) {
      return res.status(401).json({ message: 'No estás autenticado' });
  }

  try {
      // Call the stored procedures and get the results
      const [estadisticasResult] = await sequelize.query('CALL obtener_estadisticas_por_usuario(:p_id_usuario)', {
          replacements: { p_id_usuario: user.id },
          type: sequelize.QueryTypes.SELECT,
      });

      const [aprobadosDesaprobadosResult] = await sequelize.query('CALL sp_aprobados_desaprobados(:user_id)', {
          replacements: { user_id: user.id },
          type: sequelize.QueryTypes.RAW,
      });

      const [simulacionesResult] = await sequelize.query('CALL sp_simulaciones_por_usuario(:user_id)', {
          replacements: { user_id: user.id },
          type: sequelize.QueryTypes.SELECT,
      });

      //console.log( estadisticasResult );
      //console.log(aprobadosDesaprobadosResult);
      //console.log(simulacionesResult);

      // Render the user statistics page and pass the data from the stored procedures
      res.render("user/userEstadisticas", {
          title: "Estadisticas",
          user: user,
          estadisticas: estadisticasResult,
          aprobadosDesaprobados: aprobadosDesaprobadosResult,
          simulaciones: simulacionesResult
      });

  } catch (error) {
      console.error('Error fetching user statistics:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
};

