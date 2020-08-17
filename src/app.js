const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

//Conexion a base
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('DB Connected'))
    .catch(err => console.log(err))

// Importar rutas
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// Vistas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));


//Middlewares
app.use(morgan('dev'));
//app.use(cors());
// Recibir datos de un formulario
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Rutas
app.use('/', indexRoutes);

// En escucha el servidor
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})

