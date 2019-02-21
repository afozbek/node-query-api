const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://afozbek:admin@myprojects-ggr2u.mongodb.net/crud?retryWrites=true';
app.get('/', (req, res) => {
    res.status(200).json({
        mesaj: "Hosgeldiniz"
    })
});



mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('Db connection succesfull!!');
        app.listen(port, () => {
            console.log(`Server listening on ${port}`);
        });
    }).catch(err => {
        console.log('Connection failure!!' + err)
    })
