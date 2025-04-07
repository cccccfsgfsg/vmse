const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/note-app');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Подключено к базе данных'));

app.use(bodyParser.json());
app.use('/notes', noteRoutes);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

