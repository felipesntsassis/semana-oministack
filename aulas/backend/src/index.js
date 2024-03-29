const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-4ezpb.mongodb.net/test?retryWrites=true&w=majority', 
    { useNewUrlParser: true});

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Com esta configuração padrão toda a aplicação fica acessível para qualquer domínio
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

// app.listen(3333);

server.listen(3333);

