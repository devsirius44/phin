import express from 'express';
import bodyParser from 'body-parser';
import { router as todoRouter } from './routes/todo.router.js';
import db from './db.js';
const app = express();
const port = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/v1/todo', todoRouter);

app.listen(port, function() {
  console.log(`A server is running at port ${port}`);
})