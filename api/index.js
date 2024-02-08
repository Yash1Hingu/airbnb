require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET

app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

mongoose.connect(process.env.MONGODB_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id ,name: userDoc.name}, jwtSecret, {}, (err, token) => {
                    if (err) throw err;

                    res.cookie('token', token).json(userDoc);
                })
            } else {
                res.status(404).json({ msg: 'Password Wrong' })
            }
        } else {
            res.status(404).json({ meg: 'Not Found' });
        }
    } catch (e) {
        res.status(400).json(e);
    }
})

app.get('/profile', async (req, res) => {
    const token = req.cookies.token;
    if(token) {
        jwt.verify(token,jwtSecret,{},(err,user) => {
            if (err) throw err;
            res.json(user);
        })
    } else {
        res.json(null);
    }
})
app.listen(4000, () => {
    console.log("Server Running on port 4000");
})