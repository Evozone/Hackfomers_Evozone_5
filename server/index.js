const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const { Server } = require('socket.io');

const userRouter = require('./routes/user.js');
const grievanceRouter = require('./routes/grievance.js');
const orgRouter = require('./routes/org.js');
const commentRouter = require('./routes/comment.js');
const roomsRouter = require('./routes/room.js');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Authorization'
    );
    next();
});
app.use(express.json({ limit: '10MB' }));

app.use('/api/user', userRouter);
app.use('/api/grievance', grievanceRouter);
app.use('/api/org', orgRouter);
app.use('/api/comment', commentRouter);
app.use('/api/rooms', roomsRouter);

app.get('/mtoken', (req, res) => {
    var app_access_key = process.env.HMS_ACCESS_KEY;
    var app_secret = process.env.HMS_SECRET_APP;
    try {
        const token = jwt.sign(
            {
                access_key: app_access_key,
                type: 'management',
                version: 2,
                iat: Math.floor(Date.now() / 1000),
                nbf: Math.floor(Date.now() / 1000),
            },
            app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '1h',
                jwtid: uuid4(),
            }
        );
        res.status(200).json({
            success: true,
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, welocme to hackathons API');
});

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(PORT, () =>
    console.log('Hello! This is hackathons backend, listening on port - ', PORT)
);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_URL,
    },
});
