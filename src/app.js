//invocamos express
const express = require('express');
const app = express();
//url encoded para que  no de error en el envio de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//directorio public y confguracion para funcionamiento en otras pc
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'))

//motor de platillas 
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
//----rutas
app.use('/', require('./routes/index'));
//servidor
app.listen(5000, () => {
    console.log("servidor en http://localhost:5000")
})