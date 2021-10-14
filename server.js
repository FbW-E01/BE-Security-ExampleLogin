import express from 'express';
import config from './libs/config.js';
import connect from './libs/db.js';
import User from './models/user.js';

const server = express();
config(server);
connect();

server.post("/register", async (req, res) => {
    try {
        const user = await User.register(req.body);
        res.json({
            _id: user.id,
            username: user.username
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "error" });
    }
});

server.post("/login", async (req, res) => {
    try {
        const success = await User.login(req.body);
        res.json({ success });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "error" });
    }
});

server.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource not found 😟" });
});

server.listen(3000, () => console.log("Listening: http://localhost:3000"));