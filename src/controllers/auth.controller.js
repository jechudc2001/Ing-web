
import User from '../models/user.js';
import bcrypt from 'bcryptjs';  


export const login = async (req, res) => {
    const { email, password } = req.body;  
    console.log(email, password);
    try {
        const user = await User.findOne({ where: { email: email } });  
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });  
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });  
        }
        req.session.user = {
            id: user.id_usuario,
            email:user.email,
            username: user.nombre_completo,
            role: user.user_type === 1 ? 'admin' : 'user', 
        };
        
        const redirectUrl = user.user_type === 1 ? '/examen' : '/userDashboard';

        // Respondemos con un objeto JSON
        return res.json({
          message: 'Usuario autenticado correctamente',
          redirectUrl: redirectUrl,  // Return the redirect URL
      });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};


  // controllers/authController.js
  export const logout = (req, res) => {
    // Destruimos la sesión
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error al cerrar sesión');  // Si hay un error al destruir la sesión
      }
  
      // Redirigimos al usuario a la pági++*-9na de login después de destruir la sesión
      res.redirect('/');  // Puedes redirigir a cualquier página después del logout
    });
  };
  