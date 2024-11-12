import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByEmail, validateUserPassword, findUserById } from '../controllers/auth.controllers.js'; // Asegúrate de que findUserById esté implementado

// Configuración de la estrategia local
passport.use(new LocalStrategy(
  {
    usernameField: 'correo',      // El campo "correo" es el "username" esperado por Passport
    passwordField: 'contrasena'   // El campo "contrasena" es el "password"
  },
  async (correo, contrasena, done) => {
    try {
      const user = await findUserByEmail(correo); // Busca el usuario por su correo
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const isValid = await validateUserPassword(user, contrasena); // Valida la contraseña
      if (!isValid) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user); // Si el usuario es válido, continúa
    } catch (error) {
      return done(error);
    }
  }
));

// Serialización del usuario
passport.serializeUser((user, done) => {
  done(null, user.id_usuario);  // Usar 'id_usuario' para serializar el usuario
});

// Deserialización del usuario
passport.deserializeUser(async (id_usuario, done) => {
  try {
    const user = await findUserById(id_usuario);  // Implementa esta función en tu controlador
    done(null, user);
  } catch (error) {
    done(error);
  }
});
