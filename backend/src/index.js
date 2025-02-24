import express from 'express';
import { PORT } from './config.js';

const app = express();
app.use(express.static('.'));

app.use('/css', express.static('frontend/styles'));
app.use('/js', express.static('frontend/Resources/js'));

app.listen(PORT)
console.log('Server on Port', PORT)
