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


export const renderUserDashboard= (req, res) => {
    res.render("user/userDashboard", { title: "XD" });
    
};
export const renderUserSeleccionarExamen= (req, res) => {
    res.render("user/userSeleccionarExamen", { title: "XD" });
};

export const renderUserCuenta= (req, res) => {
    res.render("user/userCuenta", { title: "XD" });
};

export const renderUserModoPractica= (req, res) => {
    res.render("user/userModoPractica", { title: "XD" });
};
