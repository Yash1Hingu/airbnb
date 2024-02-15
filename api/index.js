require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const imgbbUploader = require("imgbb-uploader");
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET

app.use(express.json());
app.use(cookieParser());
app.use('/upload', express.static(__dirname + '/upload'));

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

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
        console.log(e)
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
                jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
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
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        })
    } else {
        res.json(null);
    }
})

app.get('/logout', async (req, res) => {
    res.cookie('token', '').json("ok");
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'image' + Date.now() + '.png';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/upload/' + newName,
    }).then(async () => {

        let newPath = 'upload/' + newName;
        const uplfilepath = newPath;
        await imgbbUploader(process.env.IMGBB, newPath)
            .then((response) => {
                newPath = response.url;
            })
            .catch((error) => console.error(error));
        fs.unlinkSync(uplfilepath);
        res.json({ newPath });

    }).catch(err => {
        console.log(err);
        res.status(404).json({ msg: 'Not Found' });
    });
})

const photoMiddleware = multer({ dest: 'upload/' })
app.post('/upload', photoMiddleware.array('photos', 100), async (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        let newPath = path + '.' + ext;

        fs.renameSync(path, newPath);
        const uplfilepath = newPath;
        await imgbbUploader(process.env.IMGBB, newPath)
            .then((response) => {
                newPath = response.url;
                uploadFiles.push(newPath);
            })
            .catch((error) => console.error(error));
        fs.unlinkSync(uplfilepath);
    }
    res.json(uploadFiles);
})

app.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        await Place.create({
            owner: userDoc.id,
            title, address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        }).then(placeDoc => {
            res.json(placeDoc);
        }).catch(err => {
            console.log(err);
            res.status(404).json({ msg: 'Failed To Save!!!' });
        })
    })
})

app.get('/places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })
})

app.get('/edit/:id', async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        await Place.find({ _id: id }).then((placeDoc) => {
            res.json(placeDoc);
        }).catch(err => {
            return res.status(404).json(err);
        })
    })

})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userDoc.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            });

            await placeDoc.save();
            res.json('ok');
        }
    })
})

app.get('/indexplaces', async (req, res) => {
    const placeDoc = await Place.find().limit(20);
    res.json(placeDoc);
})

app.get('/place/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userDoc) => {
            if (err) throw err;
            resolve(userDoc);
        });
    })
}

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const { id, checkIn,
        checkOut,
        name,
        phone,
        guest,
        price } = req.body;

    Booking.create({
        place: id,
        user: userData.id,
        checkIn,
        checkOut,
        name,
        phone,
        guest,
        price
    }).then((bookDoc) => {
        res.json(bookDoc);
    }).catch(err => {
        res.status(404).json(err);
    })
})

app.get('/booking', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
})

app.get('/booking/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Booking.findById(id).populate('place'));

})
app.listen(4000, () => {
    console.log("Server Running on port 4000");
})