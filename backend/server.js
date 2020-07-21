const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRoutes = require('./routes/exerciseRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Running on port ${port}`)));

app.use('/exercises', exerciseRoutes);
app.use('/users', userRoutes);

const connection = mongoose.connection;
connection.once('open', () => console.group('Connected to MongDB'))