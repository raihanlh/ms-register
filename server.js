const express = require('express');
const mongodb = require('mongodb');
const app = express();

const { dbMiddleware } = require('./middlewares');

// HTTP SERVER PORT
const SERVICE_PORT = 9000;

// DB CONFIG
const dbConfig = {
    uri: 'mongodb://localhost:27017',
    db: 'test'
}

app.use(express.json()); // untuk mempermudah akses req.body
app.use(express.urlencoded({ extended: true }));

db = dbMiddleware(app, mongodb, dbConfig);
app.use(db);

app.post('/register', async (req, res) => {
    const { db } = res.locals;
    const payload = req.body;
    
    // insert to db
    const result = await db.collection('user').insertOne(payload);

    console.log(result);
    res.status(200).send(result);
});

app.get('/user-profile', async (req, res) => {
    const { db } = res.locals;
    const result = await db.collection('user').find({}).toArray();

    return res.status(200).send(result);
});

app.listen(SERVICE_PORT, () => {
    console.log('listening in port:', SERVICE_PORT)
});