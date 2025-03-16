const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Configuración de Firebase
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDtQLjjlmC1W7SnjJbo1VL9yT3I3g1OHwo",
    authDomain: "mi-sitio-web-lz2079.firebaseapp.com",
    projectId: "mi-sitio-web-lz2079",
    storageBucket: "mi-sitio-web-lz2079.firebasestorage.app",
    messagingSenderId: "69647400917",
    appId: "1:69647400917:web:cd0807bfca8b27a768475c",
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Ruta para manejar el envío del formulario
app.post("/enviar-formulario", async (req, res) => {
    const { nombre, contacto, mensaje, "como-se-entero": comoSeEntero } = req.body;

    try {
        // Guardar los datos en Firestore
        const docRef = await addDoc(collection(db, "formularios"), {
            nombre,
            contacto,
            mensaje,
            comoSeEntero,
            fecha: new Date().toISOString(),
        });
        console.log("Datos guardados con ID:", docRef.id);

        // Respuesta al cliente
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Gracias por contactar</title>
                <link href="https://fonts.googleapis.com/css2?family=Krona+One&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: "Montserrat", sans-serif;
                        background-color: #818C78;
                        color: #273c2c;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 {
                        color: #273c2c;
                    }
                    a {
                        color: #E9762B;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>¡Gracias por contactar, ${nombre}!</h1>
                <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
                <a href="/">Volver al inicio</a>
            </body>
            </html>
        `);
    } catch (err) {
        console.error("Error al guardar los datos:", err);
        res.status(500).send("Error al procesar el formulario.");
    }
});

// Ruta para obtener todos los formularios guardados
app.get("/ver-formularios", async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "formularios"));
        const formularios = [];
        querySnapshot.forEach((doc) => {
            formularios.push({ id: doc.id, ...doc.data() });
        });
        res.json(formularios); // Devuelve los datos en formato JSON
    } catch (err) {
        console.error("Error al obtener los datos:", err);
        res.status(500).send("Error al obtener los datos.");
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});