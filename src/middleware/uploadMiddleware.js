
// Este archivo configura el middleware `multer` para manejar la carga de archivos en el servidor.
// En este caso, está diseñado específicamente para subir imágenes relacionadas con preguntas,
// almacenándolas en una carpeta específica del proyecto. El nombre del archivo subido se genera 
// de forma única para evitar conflictos y asegurarse de que no se sobrescriban archivos existentes.

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/images/preguntas/'); // Ruta donde se almacenará la imagen
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = uniqueSuffix + path.extname(file.originalname);
    console.log("///////////////////////////////////////////////////////////////////////")
    console.log(uniqueSuffix);
    console.log(fileName);
    console.log(path.extname(file.originalname));
    cb(null, fileName); // Solo el nombre del archivo
  }
});

const upload = multer({ storage: storage });

export default upload;


